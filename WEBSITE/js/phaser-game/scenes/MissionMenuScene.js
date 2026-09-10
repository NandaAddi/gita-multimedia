/**
 * ECO-EXPLORER (PHASER 3) - MISSION MENU SCENE (RAMAH SISWA KELAS 5 SD)
 * Menampilkan 4 Kasus Krisis Sawah dengan bahasa yang mudah dipahami siswa SD.
 */

class MissionMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MissionMenuScene' });
  }

  create() {
    const { width, height } = this.scale;
    const activeTeam = this.registry.get('activeTeam') || { name: 'TIM DETEKTIF', color: 0x10b981, badge: 'badge_elang' };

    // 1. Background Sawah Pixel Art & Ambient Dimmer
    const bg = this.add.image(width / 2, height / 2, 'bg_sawah');
    bg.setDisplaySize(width, height);
    this.add.rectangle(width / 2, height / 2, width, height, 0x021a14, 0.68);

    // 2. Top Header Status Tim Aktif
    const topBar = this.add.rectangle(width / 2, 60, 1640, 80, 0x0f172a, 0.95);
    topBar.setStrokeStyle(3, activeTeam.color);

    // Lencana Tim
    this.add.image(180, 60, activeTeam.badge).setDisplaySize(60, 60);

    this.add.text(230, 43, `GILIRAN KELOMPOK: ${activeTeam.name}`, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '25px',
      color: '#fef08a',
      fontStyle: 'bold'
    });

    const assignedMissionId = this.registry.get('assignedMissionId') || (activeTeam.id === 'katak' ? 2 : (activeTeam.id === 'padi' ? 3 : (activeTeam.id === 'jamur' ? 4 : 1)));
    const classSession = this.registry.get('classSession') || { completedMissions: {} };

    this.add.text(230, 73, `Peran Ekologis: ${activeTeam.role} • Rekomendasi Kasus: Misi ${assignedMissionId}`, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '16px',
      color: '#a7f3d0',
      fontStyle: 'bold'
    });

    // Tombol Suara Pengantar Menu Misi (🔊)
    const btnVoiceMenu = this.add.rectangle(width - 370, 60, 52, 50, 0x10b981).setInteractive({ useHandCursor: true });
    btnVoiceMenu.setStrokeStyle(2, 0xfef08a);
    this.add.text(width - 370, 60, '🔊', { fontSize: '22px' }).setOrigin(0.5);

    btnVoiceMenu.on('pointerdown', () => {
      btnVoiceMenu.setScale(0.92);
      this.time.delayedCall(100, () => btnVoiceMenu.setScale(1.0));
      if (window.soundEngine) {
        window.soundEngine.playBeep();
        window.soundEngine.playVO('vo_mission_menu_intro', 'Pilihlah salah satu kasus krisis sawah yang ingin kalian selidiki bersama kelompokmu!');
      }
    });

    // Tombol Ganti Tim
    const btnChangeTeam = this.add.rectangle(width - 240, 60, 180, 50, 0x334155).setInteractive({ useHandCursor: true });
    btnChangeTeam.setStrokeStyle(2, 0x94a3b8);
    this.add.text(width - 240, 60, '🔄 Ganti Tim', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '18px',
      color: '#ffffff'
    }).setOrigin(0.5);

    btnChangeTeam.on('pointerdown', () => {
      if (window.soundEngine) {
        window.soundEngine.playBeep();
        window.soundEngine.stopVoice();
      }
      this.scene.start('TeamSelectScene');
    });

    // 3. 4 Kasus Krisis Sawah Ramah Anak
    const missions = [
      {
        id: 1,
        title: 'Misi 1: Serbuan Hama Tikus',
        cause: 'Ular sawah diburu habis -> Tikus bertambah sangat banyak!',
        task: 'Kembalikan ular sawah agar tanaman padi selamat!',
        icon: 'icon_perburuan',
        difficulty: 'Tingkat: Mudah ⭐',
        initPop: { padi: 20, tikus: 80, katak: 40, ular: 0, elang: 15, jamur: 30 }
      },
      {
        id: 2,
        title: 'Misi 2: Bahaya Racun Semprotan',
        cause: 'Racun kimia mematikan katak -> Serangga hama merajalela!',
        task: 'Selamatkan katak dan bersihkan tanah sawah!',
        icon: 'icon_pestisida',
        difficulty: 'Tingkat: Sedang ⭐⭐',
        initPop: { padi: 30, tikus: 50, katak: 5, ular: 30, elang: 20, jamur: 10 }
      },
      {
        id: 3,
        title: 'Misi 3: Sawah Kekeringan',
        cause: 'Saluran air kering -> Padi layu dan hewan-hewan kelaparan!',
        task: 'Alirkan air irigasi agar tanaman padi segar kembali!',
        icon: 'icon_kemarau',
        difficulty: 'Tingkat: Menantang ⭐⭐⭐',
        initPop: { padi: 10, tikus: 20, katak: 20, ular: 20, elang: 10, jamur: 25 }
      },
      {
        id: 4,
        title: 'Misi 4: Sahabat Pengurai Alami',
        cause: 'Banyak sisa jerami kering menumpuk di tanah pematang!',
        task: 'Bantu jamur mengurai jerami menjadi pupuk penyubur!',
        icon: 'icon_jamur_spora',
        difficulty: 'Tingkat: Hebat ⭐⭐⭐',
        initPop: { padi: 45, tikus: 35, katak: 35, ular: 30, elang: 25, jamur: 5 }
      }
    ];

    // Grid 2 Kolom x 2 Baris Simetris
    const cardW = 780;
    const cardH = 310;
    const positions = [
      { x: 530, y: 310 },
      { x: 1390, y: 310 },
      { x: 530, y: 660 },
      { x: 1390, y: 660 }
    ];

    missions.forEach((m, idx) => {
      const pos = positions[idx];
      const isAssigned = (m.id === assignedMissionId);
      const completedBy = classSession.completedMissions[m.id];

      const strokeColor = isAssigned ? 0xf59e0b : (completedBy ? 0x22c55e : 0x38bdf8);
      const strokeWidth = isAssigned ? 5 : 3;

      const card = this.add.rectangle(pos.x, pos.y, cardW, cardH, 0x0f172a, 0.96)
        .setInteractive({ useHandCursor: true })
        .setStrokeStyle(strokeWidth, strokeColor);

      // Jika ini Misi Spesialis yang Ditugaskan ke Tim Aktif (Model Jigsaw)
      if (isAssigned) {
        const ribbon = this.add.rectangle(pos.x, pos.y - cardH / 2 + 14, cardW - 40, 28, 0xf59e0b, 0.95);
        ribbon.setStrokeStyle(1, 0xfef08a);
        const ribbonText = this.add.text(pos.x, pos.y - cardH / 2 + 14, `⭐ MISI UTAMA SPESIALIS: ${activeTeam.name} ⭐`, {
          fontFamily: 'Fredoka, sans-serif',
          fontSize: '14px',
          color: '#0f172a',
          fontStyle: 'bold'
        }).setOrigin(0.5);

        this.tweens.add({
          targets: [ribbon, ribbonText],
          scaleX: 1.02,
          scaleY: 1.02,
          duration: 900,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut'
        });
      } else if (completedBy) {
        const donePill = this.add.rectangle(pos.x + cardW / 2 - 130, pos.y - cardH / 2 + 18, 230, 26, 0x064e3b, 0.95);
        donePill.setStrokeStyle(1, 0x22c55e);
        this.add.text(pos.x + cardW / 2 - 130, pos.y - cardH / 2 + 18, `✅ Selesai oleh ${completedBy}`, {
          fontFamily: 'Fredoka, sans-serif',
          fontSize: '13px',
          color: '#fef08a',
          fontStyle: 'bold'
        }).setOrigin(0.5);
      }

      // Ikon Krisis
      this.add.image(pos.x - cardW / 2 + 75, pos.y - 65, m.icon).setDisplaySize(90, 90);

      // Judul Misi
      this.add.text(pos.x - cardW / 2 + 140, pos.y - 90, m.title, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '24px',
        color: '#ffffff',
        fontStyle: 'bold'
      });

      // Tingkat Kesulitan
      this.add.text(pos.x + cardW / 2 - 30, pos.y - 90, m.difficulty, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '17px',
        color: '#f59e0b'
      }).setOrigin(1, 0);

      // Panel Informasi Sebab & Target
      const infoBox = this.add.rectangle(pos.x + 30, pos.y - 5, cardW - 190, 100, 0x1e293b, 0.9);
      infoBox.setStrokeStyle(1, 0x475569);

      this.add.text(pos.x - cardW / 2 + 140, pos.y - 42, '⚠️ MASALAH: ' + m.cause, {
        fontFamily: 'Nunito, sans-serif',
        fontSize: '17px',
        color: '#fecaca',
        wordWrap: { width: cardW - 210 }
      });

      this.add.text(pos.x - cardW / 2 + 140, pos.y + 2, '🎯 TUGAS KITA: ' + m.task, {
        fontFamily: 'Nunito, sans-serif',
        fontSize: '17px',
        color: '#a7f3d0',
        wordWrap: { width: cardW - 210 }
      });

      // Tombol MULAI MISI
      const btnBgColor = isAssigned ? 0x059669 : (completedBy ? 0x334155 : 0x0284c7);
      const btnBorderColor = isAssigned ? 0xfef08a : 0xffffff;
      const btnLabel = isAssigned ? '🔥 SELESAIKAN MISI SPESIALIS TIM INI!' : (completedBy ? '🔄 ULANGI KASUS INI' : '🚀 MULAI SEIMBANGKAN SAWAH');

      const btnStart = this.add.rectangle(pos.x, pos.y + cardH / 2 - 45, cardW - 50, 54, btnBgColor)
        .setInteractive({ useHandCursor: true });
      btnStart.setStrokeStyle(isAssigned ? 3 : 2, btnBorderColor);

      this.add.text(pos.x, pos.y + cardH / 2 - 45, btnLabel, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: isAssigned ? '19px' : '18px',
        color: '#ffffff',
        fontStyle: 'bold'
      }).setOrigin(0.5);

      const openBriefing = () => {
        if (window.soundEngine) window.soundEngine.playBeep();
        this.tweens.add({
          targets: card,
          scale: 1.03,
          duration: 120,
          yoyo: true,
          onComplete: () => {
            this.showMissionBriefingModal(m, activeTeam);
          }
        });
      };

      card.on('pointerdown', openBriefing);
      btnStart.on('pointerdown', openBriefing);

      card.on('pointerover', () => card.setStrokeStyle(isAssigned ? 5 : 4, 0xfef08a));
      card.on('pointerout', () => card.setStrokeStyle(strokeWidth, strokeColor));
    });

    // Footer
    const footer = this.add.rectangle(width / 2, height - 35, 1200, 44, 0x022c22, 0.95);
    footer.setStrokeStyle(2, 0x10b981);
    this.add.text(width / 2, height - 35, '⏱️ Waktu permainan: 7 Menit. Sentuh misi untuk melihat buku petunjuk & pengarahan kasus detektif.', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '18px',
      color: '#fef08a',
      fontStyle: 'bold'
    }).setOrigin(0.5);
  }

  // --- MODAL PRE-MISSION BRIEFING & TUTORIAL PENGGUNAAN (MAYER PRE-TRAINING PRINCIPLE #7) ---
  showMissionBriefingModal(mission, activeTeam) {
    const { width, height } = this.scale;
    const modalGroup = this.add.group();

    // 1. Latar Belakang Gelap Transparan
    const dimBg = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.86)
      .setInteractive();
    modalGroup.add(dimBg);

    // 2. Kotak Modal Utama Berborder Emas
    const boxW = 1420;
    const boxH = 800;
    const modalBox = this.add.rectangle(width / 2, height / 2, boxW, boxH, 0x0f172a, 0.98);
    modalBox.setStrokeStyle(4, 0xfbbf24);
    modalGroup.add(modalBox);

    // 3. Header Modal
    const titleHeader = this.add.text(width / 2 - 140, height / 2 - 345, `📋 BUKU PETUNJUK KASUS: ${mission.title.toUpperCase()}`, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '26px',
      color: '#fef08a',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    modalGroup.add(titleHeader);

    const subHeader = this.add.text(width / 2 - 140, height / 2 - 315, `Giliran ${activeTeam.name}: Pahami masalah sawah dan cara mengatur tombol sebelum waktu 7 menit dimulai!`, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '16px',
      color: '#7dd3fc'
    }).setOrigin(0.5);
    modalGroup.add(subHeader);

    // Narasi Suara Pengarahan Khusus Per Misi
    let briefingSpeech = '';
    let causeDetails = '';
    let targetDetails = [];

    if (mission.id === 1) {
      briefingSpeech = `Halo Detektif dari ${activeTeam.name}! Pada Misi 1, petani memburu ular sawah hingga habis karena takut digigit. Tanpa ular, hama tikus meledak banyak dan menggerogoti batang padi. Tugas kelompok kalian adalah melepaskan minimal 20 ekor ular sawah untuk memangsa tikus hingga tersisa maksimal 30 ekor. Sentuh tombol di zona bawah layar dan perhatikan jeda waktu reaksi alam. Jika bingung, tekan tombol Tanya Teman di meja!`;
      causeDetails = 
        'Petani memburu habis ular sawah karena takut digigit.\n\n' +
        '⚠️ AKIBATNYA:\n' +
        'Tidak ada pemangsa alami tikus. Jumlah tikus meledak drastis dan memakan habis batang padi petani hingga terancam gagal panen!';
      targetDetails = [
        '🐍 Lepas Ular Sawah: Minimal 20 ekor',
        '🐀 Kendalikan Tikus: Maksimal 30 ekor',
        '🌾 Tanaman Padi: Pulihkan >= 50 rumpun',
        '🏆 Bar Kesehatan Sawah: >= 75% (HIJAU)'
      ];
    } else if (mission.id === 2) {
      briefingSpeech = `Perhatian ${activeTeam.name}! Pada Misi 2, petani menyemprot racun kimia berlebihan sehingga katak sahabat petani mati teracuni. Daun padi kini habis dimakan serangga hama. Tugas kalian adalah melepaskan minimal 30 ekor katak dan membersihkan sisa racun kimia di tanah sawah.`;
      causeDetails = 
        'Semprotan racun kimia berlebihan mematikan katak sawah.\n\n' +
        '⚠️ AKIBATNYA:\n' +
        'Tanpa katak pemangsa, serangga hama merajalela dan merusak dedaunan padi. Residu racun juga merusak kesuburan tanah!';
      targetDetails = [
        '🐸 Lepas Katak Sawah: Minimal 30 ekor',
        '✨ Netralkan Residu: Bersihkan racun',
        '🌾 Tanaman Padi: Pulihkan >= 60 rumpun',
        '🏆 Bar Kesehatan Sawah: >= 75% (HIJAU)'
      ];
    } else if (mission.id === 3) {
      briefingSpeech = `Gawat ${activeTeam.name}! Pada Misi 3, sawah dilanda kemarau panjang hingga saluran irigasi kering retak. Tanaman padi mati layu dan semua hewan kelaparan. Tugas kalian adalah membuka pintu air bendungan hingga air mencapai minimal 60 persen dan merawat tunas padi baru.`;
      causeDetails = 
        'Saluran irigasi kering retak akibat kemarau panjang.\n\n' +
        '⚠️ AKIBATNYA:\n' +
        'Padi adalah produsen utama. Jika padi mati kehausan, tikus kelaparan, ular dan elang pemangsa juga ikut punah kelaparan!';
      targetDetails = [
        '💧 Alirkan Air Irigasi: Minimal 60%',
        '🌾 Tanam Tunas Padi: Segar >= 50 rumpun',
        '🐍 Jaga Ular Sawah: Minimal 20 ekor',
        '🏆 Bar Kesehatan Sawah: >= 75% (HIJAU)'
      ];
    } else {
      briefingSpeech = `Halo ${activeTeam.name}! Pada Misi 4, tumpukan jerami kering membusuk di pematang sawah dan belum terurai. Tugas kelompok kalian adalah menyebarkan spora jamur pengurai untuk mengubah tumpukan jerami menjadi pupuk alami penyubur tanah.`;
      causeDetails = 
        'Banyak sisa jerami kering menumpuk di tanah pematang.\n\n' +
        '⚠️ AKIBATNYA:\n' +
        'Tanah sawah kekurangan zat hara alami. Padi membutuhkan peran jamur dekomposer untuk mengurai materi mati jadi pupuk humus!';
      targetDetails = [
        '🍄 Sebar Jamur Pengurai: Minimal 25 koloni',
        '✨ Urai Sisa Jerami: Sisa maksimal 15 ikat',
        '🌾 Padi Subur Berpupuk: >= 60 rumpun',
        '🏆 Bar Kesehatan Sawah: >= 75% (HIJAU)'
      ];
    }

    // Tombol Suara (🔊 DENGARKAN PETUNJUK)
    const btnVoiceBrief = this.add.rectangle(width / 2 + 500, height / 2 - 330, 240, 48, 0x10b981)
      .setInteractive({ useHandCursor: true });
    btnVoiceBrief.setStrokeStyle(2, 0xfef08a);
    const tVoiceBrief = this.add.text(width / 2 + 500, height / 2 - 330, '🔊 DENGARKAN GITA', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '17px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    modalGroup.add(btnVoiceBrief);
    modalGroup.add(tVoiceBrief);

    btnVoiceBrief.on('pointerdown', () => {
      btnVoiceBrief.setScale(0.93);
      this.time.delayedCall(100, () => btnVoiceBrief.setScale(1.0));
      if (window.soundEngine) {
        window.soundEngine.playBeep();
        window.soundEngine.playVO(`vo_mission${mission.id}_brief`, briefingSpeech);
      }
    });

    // 4. TIGA KOLOM PENGARAHAN TERSTRUKTUR (W: 420 px per kolom)
    const colY = height / 2 - 15;
    const colW = 425;
    const colH = 490;

    // --- KOLOM 1: SEBAB AKIBAT KRISIS SAWAH ---
    const col1X = width / 2 - 450;
    const cardCol1 = this.add.rectangle(col1X, colY, colW, colH, 0x1e293b, 0.95);
    cardCol1.setStrokeStyle(2, 0xef4444);
    modalGroup.add(cardCol1);

    const iconCol1 = this.add.text(col1X, colY - 200, '⚠️ MENGAPA SAWAH RUSAK?', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '19px',
      color: '#f87171',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    modalGroup.add(iconCol1);

    const gitaBriefing = this.add.image(col1X - 120, colY - 110, 'gita_idle').setDisplaySize(120, 120);
    modalGroup.add(gitaBriefing);

    const bubbleMini = this.add.rectangle(col1X + 50, colY - 110, 230, 85, 0xfffbeb, 0.98);
    bubbleMini.setStrokeStyle(2, 0x0f172a);
    const bubbleMiniText = this.add.text(col1X + 50, colY - 110, 'Detektif, selidiki\ndan selamatkan\nsawah kita! 🌾', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '15px',
      color: '#0f172a',
      fontStyle: 'bold',
      align: 'center'
    }).setOrigin(0.5);
    modalGroup.add(bubbleMini);
    modalGroup.add(bubbleMiniText);

    const tCol1 = this.add.text(col1X, colY + 80, causeDetails, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '16px',
      color: '#fecaca',
      align: 'left',
      wordWrap: { width: colW - 40 },
      lineSpacing: 5
    }).setOrigin(0.5);
    modalGroup.add(tCol1);

    // --- KOLOM 2: CARA MENGATUR TOMBOL SENTUH IFP ---
    const col2X = width / 2;
    const cardCol2 = this.add.rectangle(col2X, colY, colW, colH, 0x1e293b, 0.95);
    cardCol2.setStrokeStyle(2, 0x38bdf8);
    modalGroup.add(cardCol2);

    const iconCol2 = this.add.text(col2X, colY - 200, '🎮 CARA MENGATUR SAWAH', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '19px',
      color: '#38bdf8',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    modalGroup.add(iconCol2);

    const howToText = 
      '1. 👇 SENTUH TOMBOL ZONA BAWAH\n' +
      'Tekan tombol hijau/biru di kuadran bawah untuk menambah predator atau mengalirkan air.\n\n' +
      '2. ⏳ JEDA REAKSI ALAM 1.4 DETIK\n' +
      'Setiap tombol ditekan, ada jeda sebentar agar kalian mengamati respon alam di sawah.\n\n' +
      '3. 📢 BANTUAN CO-PILOT DI MEJA\n' +
      'Jika bingung, tekan "TANYA TEMAN"! 20 siswa di meja akan serempak mengangkat kartu warna voting!';

    const tCol2 = this.add.text(col2X, colY + 10, howToText, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '15px',
      color: '#e2e8f0',
      align: 'left',
      wordWrap: { width: colW - 40 },
      lineSpacing: 4
    }).setOrigin(0.5);
    modalGroup.add(tCol2);

    // --- KOLOM 3: TARGET PENYELAMATAN DETEKTIF ---
    const col3X = width / 2 + 450;
    const cardCol3 = this.add.rectangle(col3X, colY, colW, colH, 0x1e293b, 0.95);
    cardCol3.setStrokeStyle(2, 0x34d399);
    modalGroup.add(cardCol3);

    const iconCol3 = this.add.text(col3X, colY - 200, '🎯 TARGET KEBERHASILAN', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '19px',
      color: '#34d399',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    modalGroup.add(iconCol3);

    let targetFormatted = 'TUNTASKAN SELURUH CHECKLIST:\n\n';
    targetDetails.forEach(td => {
      targetFormatted += `✅ ${td}\n\n`;
    });

    const tCol3 = this.add.text(col3X, colY - 10, targetFormatted, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '16px',
      color: '#a7f3d0',
      align: 'left',
      wordWrap: { width: colW - 40 },
      lineSpacing: 4,
      fontStyle: 'bold'
    }).setOrigin(0.5);
    modalGroup.add(tCol3);

    const winBadge = this.add.rectangle(col3X, colY + 175, colW - 40, 52, 0x064e3b, 0.98);
    winBadge.setStrokeStyle(2, 0x10b981);
    const winText = this.add.text(col3X, colY + 175, '🏆 Bar Kesehatan Sawah >= 75% Stabil', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '15px',
      color: '#fef08a',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    modalGroup.add(winBadge);
    modalGroup.add(winText);

    // 5. TOMBOL KEMBALI & TOMBOL MULAI SIMULASI
    const btnCancel = this.add.rectangle(width / 2 - 330, height / 2 + 325, 260, 56, 0x334155)
      .setInteractive({ useHandCursor: true });
    btnCancel.setStrokeStyle(2, 0x94a3b8);
    const tCancel = this.add.text(width / 2 - 330, height / 2 + 325, '◀️ PILIH MISI LAIN', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '17px',
      color: '#ffffff'
    }).setOrigin(0.5);
    modalGroup.add(btnCancel);
    modalGroup.add(tCancel);

    btnCancel.on('pointerdown', () => {
      if (window.soundEngine) {
        window.soundEngine.stopVoice();
        window.soundEngine.playBeep();
      }
      modalGroup.destroy(true, true);
    });

    // TOMBOL UTAMA: KAMI SUDAH PAHAM, MULAI MISI!
    const btnStartSim = this.add.rectangle(width / 2 + 200, height / 2 + 325, 540, 64, 0x059669)
      .setInteractive({ useHandCursor: true });
    btnStartSim.setStrokeStyle(3, 0xfef08a);
    const tStartSim = this.add.text(width / 2 + 200, height / 2 + 325, '🚀 KAMI SUDAH PAHAM, MULAI SIMULASI!', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '20px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    modalGroup.add(btnStartSim);
    modalGroup.add(tStartSim);

    // Efek Pulsing Lembut pada Tombol Mulai
    this.tweens.add({
      targets: btnStartSim,
      scaleX: 1.03,
      scaleY: 1.03,
      duration: 600,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    btnStartSim.on('pointerdown', () => {
      if (window.soundEngine) {
        window.soundEngine.stopVoice();
        window.soundEngine.playSuccess();
      }
      this.registry.set('activeMission', mission);
      this.cameras.main.fade(300, 2, 44, 34);
      this.time.delayedCall(300, () => {
        this.scene.start('SimulationScene');
      });
    });
  }
}

window.MissionMenuScene = MissionMenuScene;
