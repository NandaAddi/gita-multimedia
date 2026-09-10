/**
 * ECO-EXPLORER (PHASER 3) - SIMULATION SCENE (REFACTOR SENIOR GAME DEVELOPER)
 * 1. Contextual Action Gating (Hanya 2-3 tombol aksi besar & relevan per misi, anti choice-paralysis).
 * 2. Penghapusan Tombol Curang [-] (Populasi hama hanya berkurang lewat predasi alami).
 * 3. Quest Checklist Konkret Real-time (Piaget Concrete Operational).
 * 4. Arena Sawah Meluas Bebas (70% Layar).
 * 5. Visual Juice & Animasi Predasi (Teks melayang, chomp sound, flash sprite).
 * 6. Standar Satuan Biologi Akurat (Padi = rumpun, Jamur = koloni, Jerami = ikat).
 */

class SimulationScene extends Phaser.Scene {
  constructor() {
    super({ key: 'SimulationScene' });
  }

  init() {
    this.activeTeam = this.registry.get('activeTeam') || { name: 'TIM ELANG', color: 0xef4444, badge: 'badge_elang' };
    this.activeMission = this.registry.get('activeMission') || {
      id: 1,
      title: 'Misi 1: Serbuan Hama Tikus',
      initPop: { padi: 20, tikus: 80, katak: 40, ular: 0, elang: 15, jamur: 30 }
    };

    // Salin nilai populasi awal
    this.pop = { ...this.activeMission.initPop };
    this.organicWaste = (this.activeMission.id === 4) ? 60 : 35; // Tumpukan jerami (Misi 4 mulai 60 ikat)
    this.waterLevel = (this.activeMission.id === 3) ? 20 : 80;   // Air sawah (Misi 3 mulai kering 20%)
    this.pesticideClean = (this.activeMission.id === 2) ? false : true;
    this.ecoHealth = 35;
    this.ecoMood = '😱 BAHAYA';
    this.timeRemaining = 420; // 7 Menit (420 Detik)
    this.balancedSeconds = 0;
    this.isMissionComplete = false;
    this.isActionCooldown = false;
    this.allQuestsCompleted = false;

    // Wadah elemen interaktif & teks dinamis
    this.actionButtons = [];
    this.actionLabels = {};
    this.questTextLines = [];

    // Kumpulan sprite organisme aktif
    this.padiSprites = [];
    this.tikusSprites = [];
    this.katakSprites = [];
    this.ularSprites = [];
    this.elangSprites = [];
    this.jamurSprites = [];
  }

  create() {
    const { width, height } = this.scale;

    // 1. Background Sawah Pixel Art
    this.bg = this.add.image(width / 2, height / 2, 'bg_sawah');
    this.bg.setDisplaySize(width, height);

    // Wadah organisme hidup
    this.organismGroup = this.add.group();

    // Spawn awal sprite hewan dan tanaman
    this.spawnOrganisms();

    // Border Vignette Krisis Layar Penuh (Mayer Signaling Principle)
    this.crisisVignette = this.add.rectangle(width / 2, height / 2, width - 8, height - 8);
    this.crisisVignette.setStrokeStyle(6, 0xef4444, 0).setDepth(14);
    this.isVignettePulsing = false;
    this.actionCards = {};

    // 2. HUD Atas Ramping (Status Tim, Timer, Bar Kesehatan)
    this.createTopHUD(width);

    // 3. Panel Dialog Maskot Gita (Kiri Atas)
    this.createKikiGuide(width);

    // 4. Panel Quest Checklist Detektif (Kanan Atas)
    this.createQuestChecklistHUD(width);

    // 5. Panel Kontrol Layar Sentuh IFP (Bawah - Contextual Gated)
    this.createTouchControls(width, height);

    // 6. Timer Loop Simulasi (Setiap 1 Detik)
    this.simTimer = this.time.addEvent({
      delay: 1000,
      callback: this.simulationStep,
      callbackScope: this,
      loop: true
    });

    // Jalankan kalkulasi status awal
    this.calculateEcosystemHealth();
    this.updateQuestObjectives();
  }

  // --- 1. SPAWN ORGANISME DI SAWAH (RUANG HABITAT LUAS & LEGA) ---
  spawnOrganisms() {
    const { width } = this.scale;

    this.organismGroup.clear(true, true);
    this.padiSprites = [];
    this.tikusSprites = [];
    this.katakSprites = [];
    this.ularSprites = [];
    this.elangSprites = [];
    this.jamurSprites = [];

    // A. Padi di Pematang (Y: 530 - 640)
    const padiCount = Math.min(22, Math.max(3, Math.floor(this.pop.padi / 4.5)));
    for (let i = 0; i < padiCount; i++) {
      const px = 80 + (i * (width - 160) / padiCount) + Phaser.Math.Between(-12, 12);
      const py = Phaser.Math.Between(525, 625);
      const textureKey = (this.pop.padi > 30 && this.waterLevel >= 40) ? 'padi_subur' : 'padi_kering';
      const p = this.add.image(px, py, textureKey).setDisplaySize(80, 80);
      this.organismGroup.add(p);
      this.padiSprites.push(p);

      this.tweens.add({
        targets: p,
        angle: Phaser.Math.Between(-5, 5),
        duration: Phaser.Math.Between(1600, 2400),
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }

    // B. Tikus Sawah (Y: 590 - 680)
    const tikusCount = Math.min(14, Math.max(1, Math.floor(this.pop.tikus / 7)));
    for (let i = 0; i < tikusCount; i++) {
      const tx = Phaser.Math.Between(100, width - 100);
      const ty = Phaser.Math.Between(590, 680);
      const rat = this.add.image(tx, ty, 'tikus').setDisplaySize(72, 72);
      this.organismGroup.add(rat);
      this.tikusSprites.push(rat);

      this.tweens.add({
        targets: rat,
        x: tx + Phaser.Math.Between(-70, 70),
        duration: Phaser.Math.Between(900, 1500),
        yoyo: true,
        repeat: -1,
        ease: 'Linear'
      });
    }

    // C. Katak Sawah (Y: 620 - 720)
    const katakCount = Math.min(10, Math.max(0, Math.floor(this.pop.katak / 7)));
    for (let i = 0; i < katakCount; i++) {
      const kx = Phaser.Math.Between(120, width - 120);
      const ky = Phaser.Math.Between(625, 715);
      const frog = this.add.image(kx, ky, 'katak').setDisplaySize(72, 72);
      this.organismGroup.add(frog);
      this.katakSprites.push(frog);

      this.tweens.add({
        targets: frog,
        y: ky - 22,
        duration: Phaser.Math.Between(600, 950),
        yoyo: true,
        repeat: -1,
        delay: Phaser.Math.Between(200, 1400),
        ease: 'Cubic.easeOut'
      });
    }

    // D. Ular Sawah (Y: 660 - 760)
    const ularCount = Math.min(8, Math.max(0, Math.floor(this.pop.ular / 8)));
    for (let i = 0; i < ularCount; i++) {
      const ux = Phaser.Math.Between(100, width - 100);
      const uy = Phaser.Math.Between(660, 755);
      const snake = this.add.image(ux, uy, 'ular').setDisplaySize(90, 90);
      this.organismGroup.add(snake);
      this.ularSprites.push(snake);

      this.tweens.add({
        targets: snake,
        x: ux + Phaser.Math.Between(-50, 50),
        duration: Phaser.Math.Between(2200, 3600),
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }

    // E. Elang Terbang di Langit (Y: 130 - 210)
    const elangCount = Math.min(4, Math.max(0, Math.floor(this.pop.elang / 10)));
    for (let i = 0; i < elangCount; i++) {
      const ex = Phaser.Math.Between(180, width - 180);
      const ey = Phaser.Math.Between(130, 200);
      const eagle = this.add.image(ex, ey, 'elang').setDisplaySize(110, 85);
      this.organismGroup.add(eagle);
      this.elangSprites.push(eagle);

      this.tweens.add({
        targets: eagle,
        x: (ex > width / 2) ? ex - 220 : ex + 220,
        duration: Phaser.Math.Between(3200, 4800),
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }

    // F. Jamur Pengurai di Lapisan Tanah Pematang (Y: 710 - 785)
    const jamurCount = Math.min(10, Math.max(1, Math.floor(this.pop.jamur / 6)));
    for (let i = 0; i < jamurCount; i++) {
      const jx = 100 + (i * (width - 200) / jamurCount);
      const jy = Phaser.Math.Between(710, 780);
      const shroom = this.add.image(jx, jy, 'jamur').setDisplaySize(68, 68);
      this.organismGroup.add(shroom);
      this.jamurSprites.push(shroom);

      const baseScaleX = shroom.scaleX;
      const baseScaleY = shroom.scaleY;
      this.tweens.add({
        targets: shroom,
        alpha: 0.75,
        scaleX: baseScaleX * 1.1,
        scaleY: baseScaleY * 1.1,
        duration: Phaser.Math.Between(1100, 1700),
        yoyo: true,
        repeat: -1
      });
    }

    // G. Tumpukan Sisa Jerami (Misi 4)
    if (this.organicWaste > 10) {
      this.bangkaiImg = this.add.image(width / 2 + 180, 735, 'bangkai').setDisplaySize(88, 75);
      this.organismGroup.add(this.bangkaiImg);
    }
  }

  // --- 2. TOP HUD RAMPING (55 PX) ---
  createTopHUD(width) {
    const topGroup = [];
    const bar = this.add.rectangle(width / 2, 40, width * 0.98, 60, 0x0f172a, 0.95);
    bar.setStrokeStyle(2, 0x38bdf8);
    topGroup.push(bar);

    // Tombol Keluar
    const btnBack = this.add.rectangle(75, 40, 100, 40, 0x334155).setInteractive({ useHandCursor: true });
    btnBack.setStrokeStyle(1, 0x64748b);
    const tBack = this.add.text(75, 40, '🚪 KELUAR', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '14px',
      color: '#ffffff'
    }).setOrigin(0.5);
    topGroup.push(btnBack, tBack);

    btnBack.on('pointerdown', () => {
      if (window.soundEngine) window.soundEngine.playBeep();
      this.scene.start('MissionMenuScene');
    });

    // Lencana & Nama Tim
    const badge = this.add.image(165, 40, this.activeTeam.badge).setDisplaySize(42, 42);
    const tTeam = this.add.text(195, 30, this.activeTeam.name, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '20px',
      color: '#ffffff',
      fontStyle: 'bold'
    });
    topGroup.push(badge, tTeam);

    // Timer Giliran Kelompok
    this.timerText = this.add.text(440, 30, '⏱️ WAKTU: 07:00', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '20px',
      color: '#fef08a',
      fontStyle: 'bold'
    });
    topGroup.push(this.timerText);

    // Bar Kesehatan Ekosistem
    const tHealthLbl = this.add.text(720, 22, 'KESEHATAN SAWAH:', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '13px',
      color: '#cbd5e1'
    });

    this.moodText = this.add.text(720, 40, '😱 BAHAYA (35%)', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '17px',
      color: '#ef4444',
      fontStyle: 'bold'
    });

    const hpBarWidth = 170;
    const hpBg = this.add.rectangle(930, 40, hpBarWidth, 20, 0x1e293b).setStrokeStyle(1, 0x475569);
    this.hpBarFill = this.add.rectangle(930 - hpBarWidth / 2, 40, (hpBarWidth * this.ecoHealth) / 100, 16, 0xef4444).setOrigin(0, 0.5);
    topGroup.push(tHealthLbl, this.moodText, hpBg, this.hpBarFill);

    // Tombol Bantuan Co-Pilot Bangku
    const btnCoPilot = this.add.rectangle(1180, 40, 180, 42, 0x0284c7).setInteractive({ useHandCursor: true });
    btnCoPilot.setStrokeStyle(2, 0xbae6fd);
    const tCoPilot = this.add.text(1180, 40, '📢 TANYA TEMAN', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '15px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    topGroup.push(btnCoPilot, tCoPilot);

    btnCoPilot.on('pointerdown', () => {
      if (window.soundEngine) window.soundEngine.playSuccess();
      this.triggerCoPilotCallout();
    });

    topGroup.forEach(obj => obj.setDepth(15));
  }

  // --- 3. PANEL DIALOG GITA (KIRI ATAS - MAYER EMBODIMENT, REDUNDANCY & PERSONALIZATION) ---
  createKikiGuide(width) {
    this.kikiSprite = this.add.image(85, 155, 'gita_idle').setDisplaySize(95, 95).setDepth(15);
    this.gitaEmote = this.add.text(125, 115, '👀', { fontSize: '24px' }).setDepth(17).setOrigin(0.5);
    this.dialogBg = this.add.image(380, 155, 'dialog_box').setDisplaySize(480, 85).setDepth(15);

    let initialHeadline = `📌 ${this.activeTeam.name}: Ular Diburu! Hama Tikus Meledak!`;
    let initialSpeech = `Halo Detektif dari ${this.activeTeam.name}! Gawat sekali, ular sawah diburu hingga hama tikus meledak banyak! Yuk segera lepaskan ular sawah untuk memangsa tikus dan menyelamatkan padi kita!`;

    if (this.activeMission.id === 2) {
      initialHeadline = `📌 ${this.activeTeam.name}: Katak Teracuni! Hama Serangga Menyerang!`;
      initialSpeech = `Perhatian ${this.activeTeam.name}! Semprotan racun kimia membunuh katak sahabat petani kita! Akibatnya serangga bebas merusak padi. Yuk kembalikan katak dan bersihkan racun di tanah sawah!`;
    } else if (this.activeMission.id === 3) {
      initialHeadline = `📌 ${this.activeTeam.name}: Sawah Kekeringan! Alirkan Air Irigasi!`;
      initialSpeech = `Gawat ${this.activeTeam.name}! Saluran irigasi kering retak sehingga padi layu dan hewan-hewan kelaparan! Yuk buka pintu bendungan air agar sawah kembali subur!`;
    } else if (this.activeMission.id === 4) {
      initialHeadline = `📌 ${this.activeTeam.name}: Jerami Menumpuk! Kembangkan Jamur Pengurai!`;
      initialSpeech = `Halo ${this.activeTeam.name}! Tumpukan sisa jerami kering belum terurai di pematang. Ajak koloni jamur mengurai jerami menjadi pupuk alami penyubur padi kita!`;
    }

    this.guideFullSpeech = initialSpeech;
    this.guideText = this.add.text(170, 134, initialHeadline, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '17px',
      color: '#ffffff',
      fontStyle: 'bold',
      wordWrap: { width: 375 },
      lineSpacing: 3
    }).setDepth(16);

    const btnVoice = this.add.rectangle(565, 155, 38, 38, 0x10b981).setInteractive({ useHandCursor: true }).setDepth(15);
    btnVoice.setStrokeStyle(2, 0xfef08a);
    this.add.text(565, 155, '🔊', { fontSize: '18px' }).setOrigin(0.5).setDepth(16);

    btnVoice.on('pointerdown', () => {
      btnVoice.setScale(0.9);
      if (window.soundEngine) {
        window.soundEngine.playBeep();
        window.soundEngine.playVO(`vo_mission${this.activeMission.id}_brief`, this.guideFullSpeech);
      }
    });
    btnVoice.on('pointerup', () => btnVoice.setScale(1.0));

    // Tombol Bantuan Scaffolding Gita (Vygotsky ZPD & MKO)
    const btnHint = this.add.rectangle(610, 155, 38, 38, 0xf59e0b).setInteractive({ useHandCursor: true }).setDepth(15);
    btnHint.setStrokeStyle(2, 0xffffff);
    this.add.text(610, 155, '💡', { fontSize: '18px' }).setOrigin(0.5).setDepth(16);

    btnHint.on('pointerdown', () => {
      btnHint.setScale(0.9);
      this.triggerGitaScaffoldingHint();
    });
    btnHint.on('pointerup', () => btnHint.setScale(1.0));
  }

  // --- VYGOTSKY SCAFFOLDING & DIGITAL MKO GITA ---
  triggerGitaScaffoldingHint() {
    let hintText = '';
    let targetAction = null;

    if (this.activeMission.id === 1) {
      if (this.pop.ular < 20) {
        hintText = '💡 Petunjuk Gita: Ular pemangsa masih sedikit! Lepaskan minimal 20 ular agar hama tikus dimangsa habis!';
        targetAction = 'ular';
      } else if (this.pop.tikus > 30) {
        hintText = '💡 Petunjuk Gita: Sabar sejenak ya! Ular sedang berburu memangsa tikus secara alami di pematang!';
        targetAction = 'tikus_monitor';
      } else if (this.pop.padi < 50) {
        hintText = '💡 Petunjuk Gita: Tikus sudah terkendali! Sekarang tanam tunas padi baru agar panen melimpah!';
        targetAction = 'padi';
      } else {
        hintText = '💡 Petunjuk Gita: Hebat! Rantai makanan sudah seimbang! Segera tekan tombol SELESAI di kanan bawah!';
      }
    } else if (this.activeMission.id === 2) {
      if (this.pop.katak < 30) {
        hintText = '💡 Petunjuk Gita: Daun padi rusak dimakan serangga! Segera kembalikan 30 katak sahabat petani!';
        targetAction = 'katak';
      } else if (!this.pesticideClean) {
        hintText = '💡 Petunjuk Gita: Racun kimia semprotan masih mencemari tanah! Bersihkan residu racun kimia!';
        targetAction = 'bersih_racun';
      } else {
        hintText = '💡 Petunjuk Gita: Tanam tunas padi segar untuk menggantikan daun yang rusak teracuni!';
        targetAction = 'padi';
      }
    } else if (this.activeMission.id === 3) {
      if (this.waterLevel < 60) {
        hintText = '💡 Petunjuk Gita: Padi layu karena tanah retak kekeringan! Alirkan air irigasi minimal 60%!';
        targetAction = 'air';
      } else {
        hintText = '💡 Petunjuk Gita: Air sudah cukup! Tanam tunas padi dan amankan rantai makanan dari tikus!';
        targetAction = 'padi';
      }
    } else {
      if (this.pop.jamur < 25) {
        hintText = '💡 Petunjuk Gita: Sebar spora jamur pengurai minimal 25 koloni untuk membusukkan jerami!';
        targetAction = 'jamur';
      } else if (this.organicWaste > 15) {
        hintText = '💡 Petunjuk Gita: Tekan tombol Urai Jerami agar jamur mengubah jerami jadi pupuk alami penyubur padi!';
        targetAction = 'urai_jerami';
      } else {
        hintText = '💡 Petunjuk Gita: Tanah sudah kaya zat hara pupuk! Tanam tunas padi baru agar panen subur!';
        targetAction = 'padi';
      }
    }

    this.guideText.setText(hintText);
    this.guideFullSpeech = hintText;

    if (window.soundEngine) {
      window.soundEngine.playSuccess();
      window.soundEngine.playVO(`vo_sim_hint_m${this.activeMission.id}`, hintText);
    }

    if (targetAction) {
      this.triggerActionSignaling(targetAction);
    }
    this.showFloatingNotice('💡 Bimbingan Gita Diaktifkan!', 0xfef08a);
  }

  // --- EMBODIMENT PRINCIPLE: EKSPRESI DINAMIS AGEN PEDAGOGIS GITA ---
  updateGitaEmbodiment() {
    if (!this.kikiSprite) return;

    if (this.ecoHealth < 45) {
      if (this.gitaEmote) this.gitaEmote.setText('⚠️');
      if (!this.isGitaWobbling) {
        this.isGitaWobbling = true;
        this.tweens.add({
          targets: this.kikiSprite,
          angle: { from: -4, to: 4 },
          duration: 200,
          yoyo: true,
          repeat: -1
        });
      }
    } else if (this.ecoHealth >= 75) {
      if (this.gitaEmote) this.gitaEmote.setText('🎉');
      this.isGitaWobbling = false;
      this.tweens.killTweensOf(this.kikiSprite);
      this.kikiSprite.setAngle(0);
      this.tweens.add({
        targets: this.kikiSprite,
        scaleX: 1.08,
        scaleY: 1.08,
        duration: 280,
        yoyo: true,
        repeat: 1
      });
    } else {
      if (this.gitaEmote) this.gitaEmote.setText('👀');
      this.isGitaWobbling = false;
      this.tweens.killTweensOf(this.kikiSprite);
      this.kikiSprite.setAngle(0);
    }
  }

  // --- 4. QUEST CHECKLIST HUD REAL-TIME (KANAN ATAS - PIAGET CONCRETE) ---
  createQuestChecklistHUD(width) {
    const boxW = 500;
    const boxH = 145;
    const boxX = width - boxW / 2 - 25;
    const boxY = 150;

    const questCard = this.add.rectangle(boxX, boxY, boxW, boxH, 0x0f172a, 0.94).setDepth(15);
    questCard.setStrokeStyle(3, 0x38bdf8);

    this.add.text(boxX - boxW / 2 + 18, boxY - 52, '📋 TUGAS PENYELAMATAN DETEKTIF:', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '16px',
      color: '#fef08a',
      fontStyle: 'bold'
    }).setDepth(16);

    this.questTextLines = [];
    for (let i = 0; i < 3; i++) {
      const qText = this.add.text(boxX - boxW / 2 + 20, boxY - 20 + (i * 30), '', {
        fontFamily: 'Nunito, sans-serif',
        fontSize: '15px',
        color: '#ffffff',
        fontStyle: 'bold'
      }).setDepth(16);
      this.questTextLines.push(qText);
    }
  }

  updateQuestObjectives() {
    if (!this.questTextLines || this.questTextLines.length < 3) return;

    let q1Met = false, q2Met = false, q3Met = false;
    let t1 = '', t2 = '', t3 = '';

    if (this.activeMission.id === 1) {
      // Misi 1: Ular & Tikus
      q1Met = this.pop.ular >= 20;
      t1 = `${q1Met ? '✅' : '⬜'} 🐍 Lepas Ular Sawah: ${this.pop.ular}/20 ekor (Min 20)`;

      q2Met = this.pop.tikus <= 30;
      t2 = `${q2Met ? '✅' : '⬜'} 🐀 Hama Tikus Terkendali: ${this.pop.tikus} ekor (Maks 30)`;

      q3Met = this.pop.padi >= 50;
      t3 = `${q3Met ? '✅' : '⬜'} 🌾 Tanaman Padi Subur: ${this.pop.padi}/50 rumpun (Min 50)`;

    } else if (this.activeMission.id === 2) {
      // Misi 2: Racun Kimia & Katak
      q1Met = this.pop.katak >= 30;
      t1 = `${q1Met ? '✅' : '⬜'} 🐸 Pulihkan Katak Sawah: ${this.pop.katak}/30 ekor (Min 30)`;

      q2Met = this.pop.padi >= 60;
      t2 = `${q2Met ? '✅' : '⬜'} 🌾 Tanaman Padi Pulih: ${this.pop.padi}/60 rumpun (Min 60)`;

      q3Met = this.ecoHealth >= 75;
      t3 = `${q3Met ? '✅' : '⬜'} 🍃 Sawah Bebas Racun & Sehat (${this.ecoHealth}%)`;

    } else if (this.activeMission.id === 3) {
      // Misi 3: Kekeringan Irigasi
      q1Met = this.waterLevel >= 60;
      t1 = `${q1Met ? '✅' : '⬜'} 💧 Alirkan Air Irigasi: ${this.waterLevel}% (Min 60%)`;

      q2Met = this.pop.padi >= 50;
      t2 = `${q2Met ? '✅' : '⬜'} 🌾 Tanaman Padi Segar: ${this.pop.padi}/50 rumpun (Min 50)`;

      q3Met = this.ecoHealth >= 75;
      t3 = `${q3Met ? '✅' : '⬜'} ⚖️ Rantai Makanan Seimbang (${this.ecoHealth}%)`;

    } else {
      // Misi 4: Sahabat Pengurai
      q1Met = this.pop.jamur >= 25;
      t1 = `${q1Met ? '✅' : '⬜'} 🍄 Kembangkan Jamur Pengurai: ${this.pop.jamur}/25 koloni`;

      q2Met = this.organicWaste <= 15;
      t2 = `${q2Met ? '✅' : '⬜'} ✨ Urai Sisa Jerami: Sisa ${this.organicWaste} ikat (Maks 15)`;

      q3Met = this.pop.padi >= 60;
      t3 = `${q3Met ? '✅' : '⬜'} 🌾 Padi Menyerap Pupuk Humus: ${this.pop.padi}/60 rumpun`;
    }

    this.questTextLines[0].setText(t1).setColor(q1Met ? '#34d399' : '#f8fafc');
    this.questTextLines[1].setText(t2).setColor(q2Met ? '#34d399' : '#f8fafc');
    this.questTextLines[2].setText(t3).setColor(q3Met ? '#34d399' : '#f8fafc');

    const allNow = q1Met && q2Met && q3Met;
    if (allNow && !this.allQuestsCompleted) {
      this.allQuestsCompleted = true;
      if (window.soundEngine) window.soundEngine.playSuccess();
      this.showFloatingNotice('🎉 SEMUA TUGAS SELESAI! TEKAN "CEK HASIL"!', 0x34d399);

      if (this.btnVerify) {
        this.btnVerify.setFillStyle(0x10b981);
        this.tweens.add({
          targets: this.btnVerify,
          scale: 1.05,
          duration: 400,
          yoyo: true,
          repeat: -1
        });
      }
    }
  }

  // --- 5. PANEL KONTROL ZONA BAWAH (CONTEXTUAL ACTION GATING - HANYA 2-3 TOMBOL BESAR) ---
  createTouchControls(width, height) {
    const panelH = 190;
    const panelY = height - panelH / 2 - 15;

    const controlPanel = this.add.rectangle(width / 2, panelY, width * 0.98, panelH, 0x090d16, 0.95);
    controlPanel.setStrokeStyle(3, 0x1e293b);

    // Label Header Zona Sentuh
    this.touchZoneHeader = this.add.text(width / 2, height - 190, '🎮 ZONA SENTUH: PILIH TINDAKAN PENYELAMATAN KELOMPOK', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '17px',
      color: '#fef08a'
    }).setOrigin(0.5);

    // Progress Bar Visual Cooldown
    this.cooldownBarBg = this.add.rectangle(width / 2, height - 170, 360, 8, 0x1e293b).setVisible(false);
    this.cooldownBarFill = this.add.rectangle(width / 2 - 180, height - 170, 360, 8, 0x38bdf8).setOrigin(0, 0.5).setVisible(false);

    this.actionButtons = [];
    this.actionLabels = {};

    // KONFIGURASI KARTU AKSI BERDASARKAN MISI AKTIF
    const missionActions = this.getContextualActions();

    const startX = 220;
    const cardSpacing = 380;
    const cardY = height - 90;

    missionActions.forEach((act, idx) => {
      const cx = startX + (idx * cardSpacing);
      const cardW = 340;
      const cardH = 125;

      const card = this.add.rectangle(cx, cardY, cardW, cardH, 0x1e293b).setStrokeStyle(2, act.color);
      card.defaultColor = act.color;
      this.actionCards[act.id] = card;

      // Ikon Aksi
      this.add.text(cx - cardW / 2 + 45, cardY - 20, act.icon, { fontSize: '38px' }).setOrigin(0.5);

      // Judul Tindakan
      this.add.text(cx + 20, cardY - 32, act.title, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '18px',
        color: '#ffffff',
        fontStyle: 'bold'
      }).setOrigin(0.5);

      // Subtitle / Peran Ekologis
      this.add.text(cx + 20, cardY - 10, act.desc, {
        fontFamily: 'Nunito, sans-serif',
        fontSize: '13px',
        color: '#cbd5e1'
      }).setOrigin(0.5);

      // Tombol Aksi Sentuh
      const btnAction = this.add.rectangle(cx + 20, cardY + 28, cardW - 60, 38, act.btnColor)
        .setInteractive({ useHandCursor: true });
      btnAction.setStrokeStyle(2, 0xffffff);

      const btnLabel = this.add.text(cx + 20, cardY + 28, act.btnText, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '15px',
        color: '#ffffff',
        fontStyle: 'bold'
      }).setOrigin(0.5);

      // Label Status & Target Kuota Terintegrasi (Spatial Contiguity Principle)
      const statusText = this.add.text(cx, cardY + 50, act.statusGetter(), {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '12px',
        color: '#fef08a',
        backgroundColor: '#090d16',
        padding: { x: 8, y: 3 }
      }).setOrigin(0.5);
      this.actionLabels[act.id] = { textObj: statusText, getter: act.statusGetter };

      btnAction.on('pointerdown', () => {
        act.handler(btnAction);
      });

      this.actionButtons.push(btnAction);
    });

    // TOMBOL SELESAI (CEK HASIL PENYELIDIKAN) - KANAN
    const finishX = width - 150;
    const finishY = height - 90;
    this.btnVerify = this.add.rectangle(finishX, finishY, 210, 125, 0x059669)
      .setInteractive({ useHandCursor: true });
    this.btnVerify.setStrokeStyle(3, 0xfef08a);

    this.add.text(finishX, finishY - 20, '✅ SELESAI', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '22px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(finishX, finishY + 20, 'CEK HASIL 🔍', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '16px',
      color: '#fef08a',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.btnVerify.on('pointerdown', () => {
      this.checkMissionCompletion();
    });
  }

  // --- SIGNALING PRINCIPLE: SOROTAN EMAS PADA TINDAKAN KRITIS ---
  triggerActionSignaling(targetActionId) {
    if (!this.actionCards) return;
    Object.keys(this.actionCards).forEach(id => {
      const card = this.actionCards[id];
      if (id === targetActionId) {
        if (!card.isPulsing) {
          card.isPulsing = true;
          this.tweens.add({
            targets: card,
            scaleX: 1.04,
            scaleY: 1.04,
            duration: 450,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
          });
        }
      } else {
        if (card.isPulsing) {
          card.isPulsing = false;
          this.tweens.killTweensOf(card);
          card.setScale(1.0);
          card.setStrokeStyle(2, card.defaultColor || 0x38bdf8);
        }
      }
    });
  }

  // DAFTAR TINDAKAN BERDASARKAN MISI (SPATIAL CONTIGUITY & CONTEXTUAL GATING)
  getContextualActions() {
    const mid = this.activeMission.id;

    if (mid === 1) {
      // MISI 1: Ular & Padi
      return [
        {
          id: 'ular',
          icon: '🐍',
          title: 'LEPAS ULAR SAWAH',
          desc: 'Predator pemburu hama tikus',
          btnText: '➕ LEPAS 10 ULAR',
          color: 0x0d9488,
          btnColor: 0x0f766e,
          statusGetter: () => `🐍 Ular: ${this.pop.ular}/20 ekor (🎯 Min 20)`,
          handler: (btn) => this.applyEcosystemAction('ular', +10, btn, '🐍 Ular Dilepas ke Sawah! Memburu Tikus!')
        },
        {
          id: 'padi',
          icon: '🌾',
          title: 'TANAM TUNAS PADI',
          desc: 'Tanaman pangan sumber energi',
          btnText: '➕ TANAM 10 PADI',
          color: 0x16a34a,
          btnColor: 0x15803d,
          statusGetter: () => `🌾 Padi: ${this.pop.padi}/50 rumpun (🎯 Min 50)`,
          handler: (btn) => this.applyEcosystemAction('padi', +10, btn, '🌾 Tunas Padi Baru Ditanam di Pematang!')
        },
        {
          id: 'tikus_monitor',
          icon: '🐀',
          title: 'PANTAU HAMA TIKUS',
          desc: 'Alami dimangsa ular pemangsa',
          btnText: '👁️ AMATI PREDIASI ALAMI',
          color: 0x78716c,
          btnColor: 0x475569,
          statusGetter: () => `🐀 Tikus: ${this.pop.tikus} ekor (🎯 Maks 30)`,
          handler: (btn) => {
            this.showFloatingNotice('💡 Biarkan ular memangsa tikus secara alami!', 0xfef08a);
          }
        }
      ];
    } else if (mid === 2) {
      // MISI 2: Katak, Padi & Netralkan Residu
      return [
        {
          id: 'katak',
          icon: '🐸',
          title: 'LEPAS KATAK SAWAH',
          desc: 'Sahabat petani pemangsa serangga',
          btnText: '➕ LEPAS 10 KATAK',
          color: 0x16a34a,
          btnColor: 0x15803d,
          statusGetter: () => `🐸 Katak: ${this.pop.katak}/30 ekor (🎯 Min 30)`,
          handler: (btn) => this.applyEcosystemAction('katak', +10, btn, '🐸 Katak Sahabat Petani Memburu Serangga!')
        },
        {
          id: 'padi',
          icon: '🌾',
          title: 'TANAM TUNAS PADI',
          desc: 'Ganti daun padi yang rusak',
          btnText: '➕ TANAM 10 PADI',
          color: 0x22c55e,
          btnColor: 0x16a34a,
          statusGetter: () => `🌾 Padi: ${this.pop.padi}/60 rumpun (🎯 Min 60)`,
          handler: (btn) => this.applyEcosystemAction('padi', +10, btn, '🌾 Tunas Padi Segar Menggantikan Daun Rusak!')
        },
        {
          id: 'bersih_racun',
          icon: '🍃',
          title: 'BERSIHKAN TANAH',
          desc: 'Netralkan residu semprotan kimia',
          btnText: '✨ NETRALKAN RESIDU',
          color: 0x0284c7,
          btnColor: 0x0369a1,
          statusGetter: () => (this.pesticideClean ? '🍃 Tanah: 100% Alami (✅ Target)' : '🍃 Tanah: Ada Residu (⚠️ Bersihkan)'),
          handler: (btn) => {
            this.pesticideClean = true;
            this.showFloatingNotice('✨ Tanah Sawah Kembali Alami & Subur!', 0x38bdf8);
            this.calculateEcosystemHealth();
            this.updateQuestObjectives();
            this.startActionCooldown();
          }
        }
      ];
    } else if (mid === 3) {
      // MISI 3: Irigasi, Padi, Ular
      return [
        {
          id: 'air',
          icon: '💧',
          title: 'ALIRKAN AIR IRIGASI',
          desc: 'Buka pintu bendungan sawah',
          btnText: '🚿 ALIRKAN AIR (+25%)',
          color: 0x0284c7,
          btnColor: 0x0369a1,
          statusGetter: () => `💧 Air: ${this.waterLevel}% (🎯 Min 60%)`,
          handler: (btn) => this.applyIrrigationAction(btn)
        },
        {
          id: 'padi',
          icon: '🌾',
          title: 'TANAM TUNAS PADI',
          desc: 'Tumbuh subur jika air mencukupi',
          btnText: '➕ TANAM 10 PADI',
          color: 0x16a34a,
          btnColor: 0x15803d,
          statusGetter: () => `🌾 Padi: ${this.pop.padi}/50 rumpun (🎯 Min 50)`,
          handler: (btn) => this.applyEcosystemAction('padi', +10, btn, '🌾 Padi Menyerap Air dan Tumbuh Segar!')
        },
        {
          id: 'ular',
          icon: '🐍',
          title: 'JAGA ULAR SAWAH',
          desc: 'Cegah hama tikus mencuri padi',
          btnText: '➕ LEPAS 10 ULAR',
          color: 0x0d9488,
          btnColor: 0x0f766e,
          statusGetter: () => `🐍 Ular: ${this.pop.ular} ekor (🎯 Penjaga Sawah)`,
          handler: (btn) => this.applyEcosystemAction('ular', +10, btn, '🐍 Ular Sawah Menjaga Padi dari Tikus!')
        }
      ];
    } else {
      // MISI 4: Jamur Pengurai & Jerami
      return [
        {
          id: 'jamur',
          icon: '🍄',
          title: 'SEBAR SPORA JAMUR',
          desc: 'Koloni pengurai alami tanah',
          btnText: '➕ SEBAR 10 JAMUR',
          color: 0x7e22ce,
          btnColor: 0x6b21a8,
          statusGetter: () => `🍄 Jamur: ${this.pop.jamur}/25 koloni (🎯 Min 25)`,
          handler: (btn) => this.applyEcosystemAction('jamur', +10, btn, '🍄 Koloni Jamur Siap Mengurai Jerami!')
        },
        {
          id: 'urai_jerami',
          icon: '✨',
          title: 'URAI JERAMI JADI PUPUK',
          desc: 'Ubah sisa jerami jadi zat hara',
          btnText: '🌾 URAI 20 JERAMI',
          color: 0x9333ea,
          btnColor: 0x7e22ce,
          statusGetter: () => `✨ Jerami: ${this.organicWaste} ikat (🎯 Maks 15)`,
          handler: (btn) => this.activateDecomposer()
        },
        {
          id: 'padi',
          icon: '🌾',
          title: 'TANAM TUNAS PADI',
          desc: 'Akar padi menyerap pupuk humus',
          btnText: '➕ TANAM 10 PADI',
          color: 0x16a34a,
          btnColor: 0x15803d,
          statusGetter: () => `🌾 Padi: ${this.pop.padi}/60 rumpun (🎯 Min 60)`,
          handler: (btn) => this.applyEcosystemAction('padi', +10, btn, '🌾 Padi Tumbuh Lebat dengan Pupuk Alami!')
        }
      ];
    }
  }

  // --- 6. EKSEKUSI TINDAKAN & COOLDOWN ---
  startActionCooldown() {
    this.isActionCooldown = true;
    this.touchZoneHeader.setText('⏳ MENGAMATI REAKSI ALAM SAWAH (DISKUSILAH DENGAN TIM)...');
    this.touchZoneHeader.setColor('#f87171');

    this.actionButtons.forEach(b => {
      b.setAlpha(0.45);
      b.disableInteractive();
    });

    this.cooldownBarBg.setVisible(true);
    this.cooldownBarFill.setVisible(true);
    this.cooldownBarFill.width = 360;

    this.tweens.add({
      targets: this.cooldownBarFill,
      width: 0,
      duration: 1400,
      ease: 'Linear',
      onComplete: () => {
        this.isActionCooldown = false;
        this.cooldownBarBg.setVisible(false);
        this.cooldownBarFill.setVisible(false);
        this.touchZoneHeader.setText('🎮 ZONA SENTUH: PILIH TINDAKAN PENYELAMATAN KELOMPOK');
        this.touchZoneHeader.setColor('#fef08a');

        this.actionButtons.forEach(b => {
          b.setAlpha(1.0);
          b.setInteractive({ useHandCursor: true });
        });
      }
    });
  }

  applyEcosystemAction(key, delta, btnElement, noticeText) {
    if (this.isActionCooldown) return;

    btnElement.setScale(0.92);
    this.time.delayedCall(120, () => btnElement.setScale(1.0));

    if (window.soundEngine) window.soundEngine.playTone(delta > 0 ? 580 : 380, 'square', 0.08);
    this.pop[key] = Math.max(0, Math.min(100, this.pop[key] + delta));

    this.updateActionLabels();
    this.showFloatingNotice(noticeText, 0x34d399);

    this.spawnOrganisms();
    this.calculateEcosystemHealth();
    this.updateQuestObjectives();

    this.startActionCooldown();
  }

  applyIrrigationAction(btnElement) {
    if (this.isActionCooldown) return;

    btnElement.setScale(0.92);
    this.time.delayedCall(120, () => btnElement.setScale(1.0));

    this.waterLevel = Math.min(100, this.waterLevel + 25);
    this.pop.padi = Math.min(100, this.pop.padi + 10);

    if (window.soundEngine) window.soundEngine.playTone(650, 'sine', 0.15);
    this.showFloatingNotice('💧 Pintu Air Dibuka! Sawah Terairi Segar (+25%)', 0x38bdf8);

    this.updateActionLabels();
    this.spawnOrganisms();
    this.calculateEcosystemHealth();
    this.updateQuestObjectives();

    this.startActionCooldown();
  }

  activateDecomposer() {
    if (this.isActionCooldown) return;

    if (this.organicWaste <= 0) {
      this.guideText.setText('Jamur: Seluruh jerami sudah terurai! Tanah sawah sangat subur kaya pupuk!');
      if (window.soundEngine) window.soundEngine.playWarning();
      return;
    }

    if (window.soundEngine) window.soundEngine.playDecomposeMagic();
    this.showFloatingNotice('✨ Jerami Kering Berubah Menjadi Pupuk Humus Alami!', 0x34d399);

    this.organicWaste = Math.max(0, this.organicWaste - 20);
    this.pop.padi = Math.min(100, this.pop.padi + 15);
    this.pop.jamur = Math.min(100, this.pop.jamur + 10);

    this.updateActionLabels();
    this.spawnOrganisms();
    this.calculateEcosystemHealth();
    this.updateQuestObjectives();

    this.startActionCooldown();
  }

  updateActionLabels() {
    Object.keys(this.actionLabels).forEach(k => {
      const item = this.actionLabels[k];
      if (item && item.textObj && item.getter) {
        item.textObj.setText(item.getter());
      }
    });
  }

  // --- 7. KALKULASI KESEHATAN EKOSISTEM SAWAH ---
  calculateEcosystemHealth() {
    let score = 55;
    let feedback = '';

    // 1. Cek Padi
    if (this.pop.padi < 30) {
      score -= 30;
      feedback = 'Tanaman padi terlalu sedikit! Hewan pemakan padi mulai kelaparan!';
    } else if (this.pop.padi >= 60) {
      score += 15;
    }

    // 2. Cek Tikus vs Ular (Misi 1)
    if (this.pop.tikus > 40 && this.pop.ular < 20) {
      score -= 35;
      feedback = 'Awas! Tikus masih banyak karena ular pemangsanya kurang dari 20 ekor!';
    } else if (this.pop.ular >= 20 && this.pop.tikus <= 35) {
      score += 15;
    }

    // 3. Cek Katak (Misi 2)
    if (this.pop.katak < 20) {
      score -= 20;
      if (!feedback) feedback = 'Katak sawah terlalu sedikit! Serangga perusak bebas memakan daun padi!';
    } else if (this.pop.katak >= 30) {
      score += 10;
    }

    // 4. Cek Air Sawah (Misi 3)
    if (this.activeMission.id === 3) {
      if (this.waterLevel < 40) {
        score -= 30;
        feedback = 'Tanah sawah kering retak! Buka pintu air agar tanaman padi tidak mati layu!';
      } else if (this.waterLevel >= 60) {
        score += 15;
      }
    }

    // 5. Cek Jamur Pengurai (Misi 4)
    if (this.activeMission.id === 4) {
      if (this.pop.jamur < 15) {
        score -= 20;
        if (!feedback) feedback = 'Jamur pengurai kurang! Tanah butuh pupuk dari jerami yang diurai!';
      } else if (this.pop.jamur >= 25 && this.organicWaste <= 15) {
        score += 15;
      }
    }

    this.ecoHealth = Math.max(10, Math.min(100, score));

    const hpBarWidth = 170;
    this.hpBarFill.width = (hpBarWidth * this.ecoHealth) / 100;

    // 1. Update Embodiment Agen Pedagogis Gita
    this.updateGitaEmbodiment();

    // 2. Update Crisis Vignette Border (Signaling Principle)
    if (this.ecoHealth < 45) {
      if (this.crisisVignette && !this.isVignettePulsing) {
        this.isVignettePulsing = true;
        this.tweens.add({
          targets: this.crisisVignette,
          strokeAlpha: { from: 0.15, to: 0.75 },
          duration: 600,
          yoyo: true,
          repeat: -1
        });
      }
    } else {
      if (this.crisisVignette && this.isVignettePulsing) {
        this.isVignettePulsing = false;
        this.tweens.killTweensOf(this.crisisVignette);
        this.crisisVignette.setStrokeStyle(6, 0xef4444, 0);
      }
    }

    // 3. Signaling / Cueing pada Kartu Aksi Solusi
    if (this.activeMission.id === 1) {
      if (this.pop.tikus > 35 && this.pop.ular < 20) {
        this.triggerActionSignaling('ular');
      } else {
        this.triggerActionSignaling(null);
      }
    } else if (this.activeMission.id === 2) {
      if (this.pop.katak < 20) {
        this.triggerActionSignaling('katak');
      } else if (!this.pesticideClean) {
        this.triggerActionSignaling('bersih_racun');
      } else {
        this.triggerActionSignaling(null);
      }
    } else if (this.activeMission.id === 3) {
      if (this.waterLevel < 50) {
        this.triggerActionSignaling('air');
      } else {
        this.triggerActionSignaling(null);
      }
    } else if (this.activeMission.id === 4) {
      if (this.pop.jamur < 20) {
        this.triggerActionSignaling('jamur');
      } else if (this.organicWaste > 20) {
        this.triggerActionSignaling('urai_jerami');
      } else {
        this.triggerActionSignaling(null);
      }
    }

    if (this.ecoHealth >= 75) {
      this.ecoMood = '😊 SEHAT';
      this.moodText.setText(`😊 SEHAT (${this.ecoHealth}%)`);
      this.moodText.setColor('#22c55e');
      this.hpBarFill.setFillStyle(0x22c55e);
      if (!feedback) feedback = 'Hebat! Rantai makanan sawah kembali seimbang! Tekan "SELESAI" untuk melihat hasil!';
    } else if (this.ecoHealth >= 45) {
      this.ecoMood = '😐 WASPADA';
      this.moodText.setText(`😐 WASPADA (${this.ecoHealth}%)`);
      this.moodText.setColor('#f59e0b');
      this.hpBarFill.setFillStyle(0xf59e0b);
    } else {
      this.ecoMood = '😱 BAHAYA';
      this.moodText.setText(`😱 BAHAYA (${this.ecoHealth}%)`);
      this.moodText.setColor('#ef4444');
      this.hpBarFill.setFillStyle(0xef4444);

      if (!this.hasTriggeredDangerVO) {
        this.hasTriggeredDangerVO = true;
        if (window.soundEngine) {
          window.soundEngine.playVO('vo_sim_danger_alert', 'Awas! Sawah dalam kondisi bahaya! Perhatikan hewan yang hilang dan segera lakukan aksi penyelamatan!');
        }
      }
    }

    if (feedback) {
      this.guideText.setText('📌 ' + feedback);
      this.guideFullSpeech = feedback;
    }
  }

  // --- 8. DINAMIKA PREDIASI OTOMATIS & GAME FEEL (TEMPORAL CONTIGUITY PRINCIPLE) ---
  simulationStep() {
    if (this.isMissionComplete) return;

    this.timeRemaining--;
    const mins = Math.floor(this.timeRemaining / 60);
    const secs = this.timeRemaining % 60;
    const timeStr = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    this.timerText.setText(`⏱️ WAKTU: ${timeStr}`);

    // Reaksi Ekologi Otomatis Setiap 3 Detik
    if (this.timeRemaining % 3 === 0 && !this.isActionCooldown) {
      let stateChanged = false;

      // 1. Jika hama tikus banyak & ular sedikit -> Tikus makan padi
      if (this.pop.tikus > 40 && this.pop.ular < 15 && this.pop.padi > 15) {
        this.pop.padi = Math.max(5, this.pop.padi - 2);
        this.showFloatingNotice('🐀 Tikus memakan batang padi! (-2 Padi)', 0xf87171);
        stateChanged = true;
      }

      // 2. Jika ular mencukupi -> Ular secara alami memangsa tikus (Predasi Visual Sinkron)
      if (this.pop.ular >= 20 && this.pop.tikus > 25) {
        const eatenRats = Math.min(4, this.pop.tikus - 15);
        if (eatenRats > 0) {
          this.pop.tikus -= eatenRats;
          this.showFloatingNotice(`🐍 Ular sawah memangsa tikus! (-${eatenRats} Tikus)`, 0x34d399);
          if (window.soundEngine) window.soundEngine.playChomp();

          // Flash efek & bite particle pada sprite tikus (Temporal Contiguity)
          if (this.tikusSprites.length > 0) {
            const victim = Phaser.Utils.Array.GetRandom(this.tikusSprites);
            if (victim) {
              const biteFx = this.add.text(victim.x, victim.y - 12, '💥 HAP!', {
                fontFamily: 'Fredoka, sans-serif',
                fontSize: '15px',
                color: '#f87171'
              }).setOrigin(0.5).setDepth(14);

              this.tweens.add({
                targets: biteFx,
                y: victim.y - 32,
                alpha: 0,
                duration: 550,
                onComplete: () => biteFx.destroy()
              });

              this.tweens.add({
                targets: victim,
                scale: 0,
                alpha: 0,
                duration: 350,
                ease: 'Back.easeIn'
              });
            }
          }
          stateChanged = true;
        }
      }

      // 3. Jika sawah kekeringan (Misi 3) -> Padi layu
      if (this.activeMission.id === 3 && this.waterLevel < 35 && this.pop.padi > 15) {
        this.pop.padi = Math.max(5, this.pop.padi - 2);
        this.showFloatingNotice('☀️ Padi layu karena kekurangan air irigasi! (-2 Padi)', 0xf59e0b);
        stateChanged = true;
      }

      // 4. Jika katak cukup banyak (Misi 2) -> Katak memangsa serangga, padi memulih
      if (this.activeMission.id === 2 && this.pop.katak >= 25 && this.pop.padi < 80) {
        this.pop.padi = Math.min(80, this.pop.padi + 2);
        this.showFloatingNotice('🐸 Katak memburu serangga! Padi bertambah (+2 Padi)', 0x34d399);
        if (window.soundEngine) window.soundEngine.playChomp();
        stateChanged = true;
      }

      if (stateChanged) {
        this.updateActionLabels();
        this.spawnOrganisms();
        this.calculateEcosystemHealth();
        this.updateQuestObjectives();
      }
    }

    // Periksa stabilitas ekosistem
    if (this.ecoHealth >= 75) {
      this.balancedSeconds++;
      if (this.balancedSeconds >= 12 && this.allQuestsCompleted) {
        this.checkMissionCompletion();
      }
    } else {
      this.balancedSeconds = 0;
    }

    if (this.timeRemaining <= 0) {
      this.simTimer.remove();
      this.handleTimeOut();
    }
  }

  // --- CSCL (COMPUTER-SUPPORTED COLLABORATIVE LEARNING): FITUR TANYA TEMAN CO-PILOT ---
  triggerCoPilotCallout() {
    const { width, height } = this.scale;

    // 1. Jeda Simulasi Timer
    if (this.simTimer) this.simTimer.paused = true;

    // 2. Bunyikan Bel Kelas & Panggilan Gita (vo_sim_copilot_call)
    if (window.soundEngine) {
      window.soundEngine.playChime();
      this.time.delayedCall(450, () => {
        window.soundEngine.playVO('vo_sim_copilot_call', 'Panggilan darurat kepada Co-Pilot di meja kelas! Operator di layar meminta saran tindakan. Diskusikan dan angkat kartu voting warna kalian sekarang!');
      });
    }

    const modalGroup = this.add.group();

    // Dimmer Backdrop
    const backdrop = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.82)
      .setInteractive()
      .setDepth(30);
    modalGroup.add(backdrop);

    // Box Utama Modal
    const boxW = 1200;
    const boxH = 640;
    const modalBox = this.add.rectangle(width / 2, height / 2, boxW, boxH, 0x0b1726, 0.98)
      .setStrokeStyle(4, 0x38bdf8)
      .setDepth(31);
    modalGroup.add(modalBox);

    // Avatar Gita Pemanggil Kelas
    const gitaAvatar = this.add.image(width / 2 - boxW / 2 + 90, height / 2 - boxH / 2 + 90, 'gita_idle')
      .setDisplaySize(120, 120)
      .setDepth(32);
    modalGroup.add(gitaAvatar);

    // Header Panggilan Kelas
    const titleText = this.add.text(width / 2 + 30, height / 2 - 250, '📢 PANGGILAN CO-PILOT: DISKUSI & VOTING KELAS 5A', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '27px',
      color: '#fef08a',
      fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(32);
    modalGroup.add(titleText);

    const subText = this.add.text(width / 2 + 30, height / 2 - 210, 'Operator IFP meminta saran aksi! Teman-teman di meja: Diskusikan dan angkat kartu voting kalian!', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '17px',
      color: '#cbd5e1'
    }).setOrigin(0.5).setDepth(32);
    modalGroup.add(subText);

    // Timer Countdown Diskusi 15 Detik
    let voteSeconds = 15;
    const timerBox = this.add.rectangle(width / 2, height / 2 - 155, 360, 42, 0x1e293b)
      .setStrokeStyle(2, 0xf59e0b)
      .setDepth(32);
    const timerText = this.add.text(width / 2, height / 2 - 155, `⏱️ SISA WAKTU VOTING: ${voteSeconds} DETIK`, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '18px',
      color: '#fef08a',
      fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(33);
    modalGroup.add(timerBox);
    modalGroup.add(timerText);

    const voteTimer = this.time.addEvent({
      delay: 1000,
      repeat: 15,
      callback: () => {
        voteSeconds--;
        if (voteSeconds >= 0) {
          timerText.setText(`⏱️ SISA WAKTU VOTING: ${voteSeconds} DETIK`);
          if (voteSeconds <= 5 && voteSeconds > 0) {
            timerText.setColor('#f87171');
            if (window.soundEngine) window.soundEngine.playTone(600, 'square', 0.05, 0.1);
          }
        }
      }
    });

    // 3 KARTU VOTING SESUAI DENGAN KARTU FISIK LKPD KELAS
    const votingOptions = [
      {
        color: 0x064e3b,
        border: 0x22c55e,
        tag: '🟢 KARTU HIJAU',
        title: 'TAMBAH PEMANGSA / JAMUR',
        desc: 'Rekomendasi menambah Ular, Katak, atau Jamur Pengurai untuk menjaga rantai makanan.',
        actionTarget: this.activeMission.id === 4 ? 'jamur' : (this.activeMission.id === 2 ? 'katak' : 'ular'),
        recText: 'Rekomendasi: Tambah Pemangsa Alami / Dekomposer'
      },
      {
        color: 0x78350f,
        border: 0xf59e0b,
        tag: '🟡 KARTU KUNING',
        title: 'ALIRKAN AIR IRIGASI',
        desc: 'Rekomendasi membuka pintu air irigasi untuk membasahi tanah sawah yang retak & kering.',
        actionTarget: 'air',
        recText: 'Rekomendasi: Alirkan Air Irigasi Sawah'
      },
      {
        color: 0x7f1d1d,
        border: 0xef4444,
        tag: '🔴 KARTU MERAH',
        title: 'BATASI HAMA & RACUN',
        desc: 'Rekomendasi membatasi lonjakan hama tikus atau membersihkan racun kimia semprotan.',
        actionTarget: this.activeMission.id === 2 ? 'bersih_racun' : 'tikus_monitor',
        recText: 'Rekomendasi: Kendalikan Hama / Bersihkan Racun'
      }
    ];

    const cardY = height / 2 + 50;
    const cardW = 340;
    const cardH = 250;
    const cardSpacing = 370;
    const startX = width / 2 - cardSpacing;

    const finalizeVote = (chosen) => {
      voteTimer.remove();
      if (window.soundEngine) window.soundEngine.playSuccess();
      modalGroup.destroy(true, true);

      // Lanjutkan timer simulasi
      if (this.simTimer) this.simTimer.paused = false;

      this.showFloatingNotice(`📢 KEPUTUSAN VOTING KELAS: ${chosen.tag}!`, 0x34d399);
      this.guideText.setText(`💡 Saran Kelas 5A: ${chosen.recText}! Lakukan tindakan ini!`);
      this.guideFullSpeech = `Hasil diskusi kelas memilih ${chosen.tag}! Rekomendasi tindakan: ${chosen.recText}!`;

      let voKey = 'vo_sim_vote_green';
      if (chosen.tag.includes('KUNING')) voKey = 'vo_sim_vote_yellow';
      else if (chosen.tag.includes('MERAH')) voKey = 'vo_sim_vote_red';

      if (window.soundEngine) {
        window.soundEngine.playVO(voKey, this.guideFullSpeech);
      }

      if (chosen.actionTarget) {
        this.triggerActionSignaling(chosen.actionTarget);
      }
    };

    votingOptions.forEach((opt, idx) => {
      const cx = startX + (idx * cardSpacing);

      const card = this.add.rectangle(cx, cardY, cardW, cardH, opt.color, 0.95)
        .setStrokeStyle(3, opt.border)
        .setInteractive({ useHandCursor: true })
        .setDepth(32);
      modalGroup.add(card);

      const tagText = this.add.text(cx, cardY - 85, opt.tag, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '20px',
        color: '#fef08a',
        fontStyle: 'bold'
      }).setOrigin(0.5).setDepth(33);
      modalGroup.add(tagText);

      const cardTitle = this.add.text(cx, cardY - 50, opt.title, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '17px',
        color: '#ffffff',
        fontStyle: 'bold'
      }).setOrigin(0.5).setDepth(33);
      modalGroup.add(cardTitle);

      const cardDesc = this.add.text(cx, cardY + 8, opt.desc, {
        fontFamily: 'Nunito, sans-serif',
        fontSize: '14px',
        color: '#cbd5e1',
        align: 'center',
        wordWrap: { width: cardW - 40 },
        lineSpacing: 4
      }).setOrigin(0.5).setDepth(33);
      modalGroup.add(cardDesc);

      const btnChoose = this.add.rectangle(cx, cardY + 80, cardW - 50, 44, opt.border)
        .setInteractive({ useHandCursor: true })
        .setDepth(33);
      const btnChooseText = this.add.text(cx, cardY + 80, '🗳️ SUARA TERBANYAK', {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '15px',
        color: '#ffffff',
        fontStyle: 'bold'
      }).setOrigin(0.5).setDepth(34);
      modalGroup.add(btnChoose);
      modalGroup.add(btnChooseText);

      // Hover effect
      card.on('pointerover', () => {
        card.setScale(1.03);
        btnChoose.setScale(1.04);
      });
      card.on('pointerout', () => {
        card.setScale(1.0);
        btnChoose.setScale(1.0);
      });

      card.on('pointerdown', () => finalizeVote(opt));
      btnChoose.on('pointerdown', () => finalizeVote(opt));
    });

    // Tombol Tutup / Kembali
    const btnCancel = this.add.rectangle(width / 2, height / 2 + 245, 260, 44, 0x334155)
      .setInteractive({ useHandCursor: true })
      .setStrokeStyle(2, 0x94a3b8)
      .setDepth(32);
    const btnCancelText = this.add.text(width / 2, height / 2 + 245, '⏩ LANJUTKAN SIMULASI', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '16px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(33);
    modalGroup.add(btnCancel);
    modalGroup.add(btnCancelText);

    btnCancel.on('pointerdown', () => {
      voteTimer.remove();
      if (window.soundEngine) window.soundEngine.playBeep();
      modalGroup.destroy(true, true);
      if (this.simTimer) this.simTimer.paused = false;
    });
  }

  showFloatingNotice(text, color = 0xfef08a) {
    const { width, height } = this.scale;
    const txt = this.add.text(width / 2, height / 2 - 50, text, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '22px',
      color: '#ffffff',
      backgroundColor: '#0f172a',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5);

    this.tweens.add({
      targets: txt,
      y: height / 2 - 120,
      alpha: 0,
      duration: 1800,
      ease: 'Cubic.easeOut',
      onComplete: () => txt.destroy()
    });
  }

  checkMissionCompletion() {
    if (this.ecoHealth < 75 && !this.allQuestsCompleted) {
      if (window.soundEngine) window.soundEngine.playWarning();
      
      let hint = 'Sawah belum seimbang! Periksa daftar tugas detektif di kanan atas ya!';
      if (this.activeMission.id === 1 && this.pop.ular < 20) {
        hint = `Ular sawah masih kurang! Lepaskan minimal ${20 - this.pop.ular} ekor ular lagi agar memangsa tikus!`;
      } else if (this.activeMission.id === 1 && this.pop.tikus > 30) {
        hint = `Tikus masih ada ${this.pop.tikus} ekor! Tunggu ular memangsanya sampai tersisa maksimal 30 ekor!`;
      }
      this.guideText.setText(hint);
      return;
    }

    this.isMissionComplete = true;
    if (window.soundEngine) window.soundEngine.playVictoryFanfare();

    this.registry.set('simResult', {
      health: this.ecoHealth,
      timeLeft: this.timeRemaining,
      team: this.activeTeam,
      mission: this.activeMission
    });

    this.time.delayedCall(800, () => {
      this.scene.start('QuizScene');
    });
  }

  handleTimeOut() {
    this.guideText.setText('Waktu habis! Mari kita pelajari mengapa rantai makanan ini belum seimbang.');
    if (window.soundEngine) window.soundEngine.playWarning();

    this.registry.set('simResult', {
      health: this.ecoHealth,
      timeLeft: 0,
      team: this.activeTeam,
      mission: this.activeMission
    });

    this.time.delayedCall(1200, () => {
      this.scene.start('QuizScene');
    });
  }
}

window.SimulationScene = SimulationScene;
