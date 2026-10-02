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
    
    // Load ecosystem and mission data from the new multi-ecosystem architecture
    this.activeEcosystemId = this.registry.get('activeEcosystem') || 'sawah';
    this.activeEcosystem = (window.ECOSYSTEMS_DATA && window.ECOSYSTEMS_DATA[this.activeEcosystemId]) || (window.ECOSYSTEMS_DATA ? window.ECOSYSTEMS_DATA.sawah : null);
    
    this.activeMission = this.registry.get('activeMission') || (this.activeEcosystem ? this.activeEcosystem.missions[0] : {
      id: 'sawah_m1',
      title: 'Misi 1: Tanah Retak Kekeringan',
      initPop: { padi: 15, tikus: 45, katak: 20, ular: 10, elang: 5, jamur: 15 }
    });

    // Backward compat: map new string mission IDs to legacy integer IDs for sawah simulation logic
    const legacyIdMap = { 'sawah_m1': 1, 'sawah_m2': 2, 'hutan_m1': 3, 'hutan_m2': 4, 'sungai_m1': 5, 'sungai_m2': 6, 'laut_m1': 7, 'laut_m2': 8 };
    this.legacyMissionId = (typeof this.activeMission.id === 'number') ? this.activeMission.id : (legacyIdMap[this.activeMission.id] || 1);

    // Salin nilai populasi awal
    this.pop = { ...(this.activeMission.initPop || {}) };
    this.organicWaste = (this.activeMission.waste !== undefined) ? this.activeMission.waste : ((this.legacyMissionId === 4) ? 60 : 35);
    this.waterLevel = (this.activeMission.waterLevel !== undefined) ? this.activeMission.waterLevel : ((this.legacyMissionId === 3 || this.legacyMissionId === 1) ? 20 : 80);
    this.pesticideClean = (this.activeMission.pesticideClean !== undefined) ? this.activeMission.pesticideClean : ((this.legacyMissionId === 2) ? false : true);
    this.trapsClean = false;
    this.limbahLevel = (this.pop.limbah !== undefined) ? this.pop.limbah : 60;
    this.sampahLevel = (this.pop.sampah !== undefined) ? this.pop.sampah : 65;
    this.ecoHealth = 35;
    this.ecoMood = '😱 BAHAYA';
    this.timeRemaining = 420; // 7 Menit (420 Detik)
    this.balancedSeconds = 0;
    this.isMissionComplete = false;
    this.isActionCooldown = false;
    this.allQuestsCompleted = false;
    this.hasTriggeredDangerVO = false;

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

    // 1. Background Dinamis Sesuai Bioma
    const bgKey = (this.activeEcosystem && this.activeEcosystem.bg) ? this.activeEcosystem.bg : 'bg_sawah';
    this.bg = this.add.image(width / 2, height / 2, bgKey);
    this.bg.setDisplaySize(width, height);

    // Registrasi pembersihan saat scene dimatikan (Cegah memory leak)
    this.events.once('shutdown', this.shutdown, this);

    // Wadah organisme hidup & Inisialisasi Sprite Pool
    this.organismGroup = this.add.group();
    this.initOrganismPool(width);
    this.updateOrganismPool();

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

  // --- 1. SPRITE OBJECT POOLING (BEBAS MEMORY LEAK & RE-CREATION) ---
  initOrganismPool(width) {
    this.padiPool = [];
    this.tikusPool = [];
    this.katakPool = [];
    this.ularPool = [];
    this.elangPool = [];
    this.jamurPool = [];

    // Tentukan tekstur sprite dinamis berdasarkan bioma
    let tProd = 'padi_subur';
    let tHerb = 'tikus';
    let tPred1 = 'katak';
    let tPred2 = 'ular';
    let tApex = 'elang';
    let tDecomp = 'jamur';

    if (this.activeEcosystemId === 'hutan') {
      tProd = 'pohon_hutan';
      tHerb = 'rusa';
      tPred1 = 'harimau';
      tPred2 = 'harimau';
      tApex = 'harimau';
      tDecomp = 'jamur_hutan';
    } else if (this.activeEcosystemId === 'sungai') {
      tProd = 'teratai';
      tHerb = 'keong';
      tPred1 = 'ikan_gabus';
      tPred2 = 'bangau';
      tApex = 'bangau';
      tDecomp = 'eceng_gondok';
    } else if (this.activeEcosystemId === 'laut') {
      tProd = 'karang';
      tHerb = 'ikan_kecil';
      tPred1 = 'penyu';
      tPred2 = 'hiu';
      tApex = 'hiu';
      tDecomp = 'pengurai_laut';
    }

    // A. Pool Produsen (Maks 24)
    const maxPadi = 24;
    for (let i = 0; i < maxPadi; i++) {
      const px = 80 + (i * (width - 160) / maxPadi) + Phaser.Math.Between(-10, 10);
      const py = Phaser.Math.Between(530, 620);
      const p = this.add.image(px, py, tProd).setDisplaySize(80, 80);
      p.setActive(false).setVisible(false);
      p.setOrigin(0.5, 0.9);
      p.baseX = px;
      p.baseY = py;
      this.organismGroup.add(p);
      this.padiPool.push(p);

      p.swayTween = this.tweens.add({
        targets: p,
        angle: Phaser.Math.Between(-4, 4),
        duration: Phaser.Math.Between(1800, 2600),
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }

    // B. Pool Herbivora / Konsumen 1 (Maks 16)
    const maxTikus = 16;
    for (let i = 0; i < maxTikus; i++) {
      const tx = Phaser.Math.Between(100, width - 100);
      const ty = Phaser.Math.Between(590, 680);
      const rat = this.add.image(tx, ty, tHerb).setDisplaySize(72, 72);
      rat.setActive(false).setVisible(false);
      rat.baseX = tx;
      rat.baseY = ty;
      this.organismGroup.add(rat);
      this.tikusPool.push(rat);

      rat.moveTween = this.tweens.add({
        targets: rat,
        x: tx + Phaser.Math.Between(-60, 60),
        duration: Phaser.Math.Between(1000, 1600),
        yoyo: true,
        repeat: -1,
        ease: 'Linear'
      });
    }

    // C. Pool Konsumen 2 (Maks 12)
    const maxKatak = 12;
    for (let i = 0; i < maxKatak; i++) {
      const kx = Phaser.Math.Between(120, width - 120);
      const ky = Phaser.Math.Between(625, 715);
      const frog = this.add.image(kx, ky, tPred1).setDisplaySize(72, 72);
      frog.setActive(false).setVisible(false);
      frog.baseX = kx;
      frog.baseY = ky;
      this.organismGroup.add(frog);
      this.katakPool.push(frog);

      frog.hopTween = this.tweens.add({
        targets: frog,
        y: ky - 20,
        duration: Phaser.Math.Between(600, 900),
        yoyo: true,
        repeat: -1,
        delay: Phaser.Math.Between(200, 1200),
        ease: 'Cubic.easeOut'
      });
    }

    // D. Pool Predator (Maks 10)
    const maxUlar = 10;
    for (let i = 0; i < maxUlar; i++) {
      const ux = Phaser.Math.Between(100, width - 100);
      const uy = Phaser.Math.Between(660, 755);
      const snake = this.add.image(ux, uy, tPred2).setDisplaySize(90, 90);
      snake.setActive(false).setVisible(false);
      snake.baseX = ux;
      snake.baseY = uy;
      this.organismGroup.add(snake);
      this.ularPool.push(snake);

      snake.slitherTween = this.tweens.add({
        targets: snake,
        x: ux + Phaser.Math.Between(-45, 45),
        duration: Phaser.Math.Between(2200, 3400),
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }

    // E. Pool Konsumen Puncak (Maks 6)
    const maxElang = 6;
    for (let i = 0; i < maxElang; i++) {
      const ex = Phaser.Math.Between(180, width - 180);
      const ey = Phaser.Math.Between(130, 200);
      const eagle = this.add.image(ex, ey, tApex).setDisplaySize(110, 85);
      eagle.setActive(false).setVisible(false);
      eagle.baseX = ex;
      eagle.baseY = ey;
      this.organismGroup.add(eagle);
      this.elangPool.push(eagle);

      eagle.flyTween = this.tweens.add({
        targets: eagle,
        x: (ex > width / 2) ? ex - 200 : ex + 200,
        duration: Phaser.Math.Between(3400, 4800),
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }

    // F. Pool Dekomposer / Pengurai (Maks 12)
    const maxJamur = 12;
    for (let i = 0; i < maxJamur; i++) {
      const jx = 100 + (i * (width - 200) / maxJamur);
      const jy = Phaser.Math.Between(710, 780);
      const shroom = this.add.image(jx, jy, tDecomp).setDisplaySize(68, 68);
      shroom.setActive(false).setVisible(false);
      shroom.baseX = jx;
      shroom.baseY = jy;
      this.organismGroup.add(shroom);
      this.jamurPool.push(shroom);

      shroom.pulseTween = this.tweens.add({
        targets: shroom,
        alpha: 0.8,
        scale: 1.08,
        duration: Phaser.Math.Between(1200, 1800),
        yoyo: true,
        repeat: -1
      });
    }

    // G. Bangkai Jerami Tunggal
    this.bangkaiImg = this.add.image(width / 2 + 180, 735, 'bangkai').setDisplaySize(88, 75);
    this.bangkaiImg.setActive(false).setVisible(false);
    this.organismGroup.add(this.bangkaiImg);
  }

  updateOrganismPool() {
    // 1. Produsen
    const prodVal = this.pop.padi || this.pop.pohon || this.pop.teratai || this.pop.karang || 20;
    const prodCount = Math.min(22, Math.max(3, Math.floor(prodVal / 4.5)));
    let prodTexture = 'padi_subur';
    if (this.activeEcosystemId === 'hutan') prodTexture = 'pohon_hutan';
    else if (this.activeEcosystemId === 'sungai') prodTexture = 'teratai';
    else if (this.activeEcosystemId === 'laut') prodTexture = 'karang';
    else prodTexture = (this.pop.padi > 30 && this.waterLevel >= 40) ? 'padi_subur' : 'padi_kering';

    this.padiSprites = [];
    this.padiPool.forEach((p, idx) => {
      const shouldShow = idx < prodCount;
      p.setActive(shouldShow).setVisible(shouldShow);
      if (shouldShow) {
        p.setTexture(prodTexture);
        this.padiSprites.push(p);
      }
    });

    // 2. Herbivora / Konsumen 1
    const herbVal = this.pop.tikus || this.pop.rusa || this.pop.keong || this.pop.ikan || 15;
    const herbCount = Math.min(14, Math.max(1, Math.floor(herbVal / 7)));
    this.tikusSprites = [];
    this.tikusPool.forEach((rat, idx) => {
      const shouldShow = idx < herbCount;
      rat.setActive(shouldShow).setVisible(shouldShow);
      if (shouldShow) {
        rat.setAlpha(1);
        rat.setDisplaySize(72, 72);
        this.tikusSprites.push(rat);
      }
    });

    // 3. Konsumen 2
    const pred1Val = this.pop.katak || (this.pop.harimau ? this.pop.harimau * 2 : 0) || this.pop.ikan || (this.pop.penyu ? this.pop.penyu * 3 : 0) || 10;
    const katakCount = Math.min(10, Math.max(0, Math.floor(pred1Val / 7)));
    this.katakSprites = [];
    this.katakPool.forEach((frog, idx) => {
      const shouldShow = idx < katakCount;
      frog.setActive(shouldShow).setVisible(shouldShow);
      if (shouldShow) {
        this.katakSprites.push(frog);
      }
    });

    // 4. Predator
    const pred2Val = this.pop.ular || (this.pop.harimau ? this.pop.harimau * 3 : 0) || (this.pop.bangau ? this.pop.bangau * 3 : 0) || (this.pop.hiu ? this.pop.hiu * 4 : 0) || 5;
    const ularCount = Math.min(8, Math.max(0, Math.floor(pred2Val / 8)));
    this.ularSprites = [];
    this.ularPool.forEach((snake, idx) => {
      const shouldShow = idx < ularCount;
      snake.setActive(shouldShow).setVisible(shouldShow);
      if (shouldShow) {
        this.ularSprites.push(snake);
      }
    });

    // 5. Konsumen Puncak
    const apexVal = this.pop.elang || (this.pop.harimau ? this.pop.harimau * 2 : 0) || (this.pop.bangau ? this.pop.bangau * 2 : 0) || (this.pop.hiu ? this.pop.hiu * 2 : 0) || 3;
    const elangCount = Math.min(4, Math.max(0, Math.floor(apexVal / 10)));
    this.elangSprites = [];
    this.elangPool.forEach((eagle, idx) => {
      const shouldShow = idx < elangCount;
      eagle.setActive(shouldShow).setVisible(shouldShow);
      if (shouldShow) {
        this.elangSprites.push(eagle);
      }
    });

    // 6. Dekomposer / Gulma
    const decompVal = this.pop.jamur || this.pop.gulma || this.pop.pengurai || 10;
    const jamurCount = Math.min(10, Math.max(1, Math.floor(decompVal / 6)));
    this.jamurSprites = [];
    this.jamurPool.forEach((shroom, idx) => {
      const shouldShow = idx < jamurCount;
      shroom.setActive(shouldShow).setVisible(shouldShow);
      if (shouldShow) {
        this.jamurSprites.push(shroom);
      }
    });

    // 7. Jerami / Sampah
    if (this.bangkaiImg) {
      const showJerami = (this.organicWaste > 10) || (this.limbahLevel > 30) || (this.sampahLevel > 30);
      this.bangkaiImg.setActive(showJerami).setVisible(showJerami);
    }
  }

  // Alias pemanggilan lama agar kompatibel 100%
  spawnOrganisms() {
    this.updateOrganismPool();
  }

  // --- 2. TOP HUD RAMPING (64 PX) ---
  createTopHUD(width) {
    const topGroup = [];
    const bar = this.add.rectangle(width / 2, 40, width * 0.98, 64, 0x090d16, 0.95);
    bar.setStrokeStyle(2, 0x0284c7);
    topGroup.push(bar);

    // Tombol Keluar (Kiri)
    const btnBack = this.add.rectangle(75, 40, 100, 40, 0x1e293b).setInteractive({ useHandCursor: true });
    btnBack.setStrokeStyle(1.5, 0x475569);
    const tBack = this.add.text(75, 40, '🚪 KELUAR', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '15px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    topGroup.push(btnBack, tBack);

    btnBack.on('pointerdown', () => {
      btnBack.setScale(0.95);
      if (window.soundEngine) window.soundEngine.playBeep();
      this.scene.start('MissionMenuScene');
    });
    btnBack.on('pointerup', () => btnBack.setScale(1.0));

    // Lencana & Nama Tim
    const badge = this.add.image(175, 40, this.activeTeam.badge).setDisplaySize(42, 42);
    const tTeam = this.add.text(205, 40, this.activeTeam.name, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '22px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0, 0.5);
    topGroup.push(badge, tTeam);

    // Timer Giliran Kelompok (Capsule Box)
    const timerBox = this.add.rectangle(460, 40, 200, 40, 0x0f172a).setStrokeStyle(1.5, 0xf59e0b);
    this.timerText = this.add.text(460, 40, '⏱️ WAKTU: 07:00', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '18px',
      color: '#fef08a',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    topGroup.push(timerBox, this.timerText);

    // Pod Bar Kesehatan Ekosistem (Centered at width / 2 = 960)
    const podW = 460;
    const podH = 54;
    const healthPodBg = this.add.rectangle(width / 2, 40, podW, podH, 0x07111e, 0.95).setStrokeStyle(2, 0x10b981);
    topGroup.push(healthPodBg);

    const ecoNameShort = (this.activeEcosystem ? this.activeEcosystem.shortName.toUpperCase() : 'EKOSISTEM');
    const tHealthLbl = this.add.text(width / 2 - podW / 2 + 18, 28, `🌿 KESEHATAN ${ecoNameShort}:`, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '14px',
      color: '#94a3b8',
      fontStyle: 'bold'
    }).setOrigin(0, 0.5);

    this.moodText = this.add.text(width / 2 + podW / 2 - 18, 28, `😱 BAHAYA (${this.ecoHealth}%)`, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '15px',
      color: '#ef4444',
      fontStyle: 'bold'
    }).setOrigin(1, 0.5);

    const hpBarWidth = 424;
    this.hpBarMaxWidth = hpBarWidth;
    const hpBg = this.add.rectangle(width / 2, 51, hpBarWidth, 12, 0x1e293b).setStrokeStyle(1, 0x334155);
    this.hpBarFill = this.add.rectangle(width / 2 - hpBarWidth / 2, 51, (hpBarWidth * this.ecoHealth) / 100, 10, 0xef4444).setOrigin(0, 0.5);
    topGroup.push(tHealthLbl, this.moodText, hpBg, this.hpBarFill);

    // Tombol Bantuan Penasihat Meja (CSCL Tanya Teman)
    const btnCoPilot = this.add.container(1380, 40);
    const btnCoPilotBg = this.add.rectangle(0, 0, 185, 40, 0x0284c7).setStrokeStyle(2, 0xbae6fd);
    const iconTanyaKey = this.textures.exists('btn_tanya_teman') ? 'btn_tanya_teman' : null;
    if (iconTanyaKey) {
      const iconTanya = this.add.image(-60, 0, iconTanyaKey).setDisplaySize(28, 28);
      btnCoPilot.add(iconTanya);
    }
    const tCoPilot = this.add.text(iconTanyaKey ? 10 : 0, 0, '📢 TANYA TEMAN', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '14px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    btnCoPilot.add([btnCoPilotBg, tCoPilot]);
    btnCoPilot.setSize(185, 40);
    btnCoPilot.setInteractive({ useHandCursor: true });
    btnCoPilot.setDepth(15);
    topGroup.push(btnCoPilot);

    btnCoPilot.on('pointerdown', () => {
      btnCoPilot.setScale(0.95);
      if (window.soundEngine) window.soundEngine.playSuccess();
      this.triggerCoPilotCallout();
    });
    btnCoPilot.on('pointerup', () => btnCoPilot.setScale(1.0));

    // Tombol Pintas Kamus Ekologi
    const btnKamus = this.add.container(1580, 40);
    const btnKamusBg = this.add.rectangle(0, 0, 175, 40, 0x064e3b).setStrokeStyle(2, 0xf59e0b);
    const tKamus = this.add.text(0, 0, '📖 KAMUS ALAM', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '14px',
      color: '#fef08a',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    btnKamus.add([btnKamusBg, tKamus]);
    btnKamus.setSize(175, 40);
    btnKamus.setInteractive({ useHandCursor: true });
    btnKamus.setDepth(15);
    topGroup.push(btnKamus);

    btnKamus.on('pointerdown', () => {
      btnKamus.setScale(0.95);
      if (window.soundEngine) window.soundEngine.playBeep();
      this.showKamusModal();
    });
    btnKamus.on('pointerup', () => btnKamus.setScale(1.0));

    // Tombol Toggle Audio (Sound Switcher)
    const btnAudio = this.add.container(1730, 40);
    const btnAudioBg = this.add.rectangle(0, 0, 75, 40, 0x1e293b).setStrokeStyle(1.5, 0x475569);
    const tAudio = this.add.text(0, 0, '🔊 Suara', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '13px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    btnAudio.add([btnAudioBg, tAudio]);
    btnAudio.setSize(75, 40);
    btnAudio.setInteractive({ useHandCursor: true });
    btnAudio.setDepth(15);
    topGroup.push(btnAudio);

    btnAudio.on('pointerdown', () => {
      btnAudio.setScale(0.95);
      if (window.soundEngine) {
        window.soundEngine.isMuted = !window.soundEngine.isMuted;
        tAudio.setText(window.soundEngine.isMuted ? '🔇 Bisu' : '🔊 Suara');
        btnAudioBg.setStrokeStyle(1.5, window.soundEngine.isMuted ? 0xef4444 : 0x475569);
      }
    });
    btnAudio.on('pointerup', () => btnAudio.setScale(1.0));

    // Tombol Toggle Fullscreen
    const btnFs = this.add.container(1820, 40);
    const btnFsBg = this.add.rectangle(0, 0, 75, 40, 0x1e293b).setStrokeStyle(1.5, 0x475569);
    const tFs = this.add.text(0, 0, '⛶ Layar', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '13px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    btnFs.add([btnFsBg, tFs]);
    btnFs.setSize(75, 40);
    btnFs.setInteractive({ useHandCursor: true });
    btnFs.setDepth(15);
    topGroup.push(btnFs);

    btnFs.on('pointerdown', () => {
      btnFs.setScale(0.95);
      if (this.scale.isFullscreen) {
        this.scale.stopFullscreen();
      } else {
        this.scale.startFullscreen();
      }
    });
    btnFs.on('pointerup', () => btnFs.setScale(1.0));

    topGroup.forEach(obj => obj.setDepth(15));
  }

  // --- 3. PANEL DIALOG GITA (KIRI ATAS - MAYER EMBODIMENT, REDUNDANCY & PERSONALIZATION) ---
  createKikiGuide(width) {
    this.kikiSprite = this.add.image(85, 155, 'gita_idle').setDisplaySize(95, 95).setDepth(15);
    this.gitaEmote = this.add.text(125, 115, '👀', { fontSize: '24px' }).setDepth(17).setOrigin(0.5);
    this.dialogBg = this.add.image(395, 155, 'dialog_box').setDisplaySize(520, 90).setDepth(15);

    let initialHeadline = this.activeMission.headline 
      ? `📌 ${this.activeTeam.name}: ${this.activeMission.headline}` 
      : `📌 ${this.activeTeam.name}: Ular Diburu! Hama Tikus Meledak!`;
    let initialSpeech = this.activeMission.speech 
      || `Halo Detektif dari ${this.activeTeam.name}! Mari kita pulihkan keseimbangan ekosistem ini bersama-sama!`;

    this.guideFullSpeech = initialSpeech;

    // Header Tag Maskot
    this.add.text(165, 126, '👧 GITA (PANDUAN DETEKTIF):', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '12px',
      color: '#fef08a',
      fontStyle: 'bold'
    }).setDepth(16);

    this.guideText = this.add.text(165, 154, initialHeadline, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '15px',
      color: '#ffffff',
      fontStyle: 'bold',
      wordWrap: { width: 360 },
      lineSpacing: 3
    }).setOrigin(0, 0.5).setDepth(16);

    const btnVoice = this.add.rectangle(555, 155, 38, 38, 0x10b981).setInteractive({ useHandCursor: true }).setDepth(15);
    btnVoice.setStrokeStyle(2, 0xfef08a);
    this.add.text(555, 155, '🔊', { fontSize: '18px' }).setOrigin(0.5).setDepth(16);

    btnVoice.on('pointerdown', () => {
      btnVoice.setScale(0.9);
      this.setGitaSpeaking(true, 5000);
      if (window.soundEngine) {
        window.soundEngine.playBeep();
        window.soundEngine.playVO(`vo_mission${this.legacyMissionId}_brief`, this.guideFullSpeech);
      }
    });
    btnVoice.on('pointerup', () => btnVoice.setScale(1.0));

    // Tombol Bantuan Scaffolding Gita (Vygotsky ZPD & MKO)
    const btnHint = this.add.rectangle(602, 155, 38, 38, 0xf59e0b).setInteractive({ useHandCursor: true }).setDepth(15);
    btnHint.setStrokeStyle(2, 0xffffff);
    this.add.text(602, 155, '💡', { fontSize: '18px' }).setOrigin(0.5).setDepth(16);

    btnHint.on('pointerdown', () => {
      btnHint.setScale(0.9);
      this.triggerGitaScaffoldingHint();
    });
    btnHint.on('pointerup', () => btnHint.setScale(1.0));
  }

  /**
   * Helper pengecekan target quest
   */
  isTargetMet(t) {
    if (!t) return true;
    let val = 0;
    if (t.key === 'health') val = this.ecoHealth;
    else if (t.key === 'waterLevel') val = this.waterLevel;
    else if (t.key === 'pesticideClean') val = this.pesticideClean;
    else if (t.key === 'trapsClean') val = this.trapsClean;
    else if (t.key === 'waste') val = this.organicWaste;
    else if (t.key === 'limbah') val = this.limbahLevel;
    else if (t.key === 'sampah') val = this.sampahLevel;
    else val = this.pop[t.key] !== undefined ? this.pop[t.key] : 0;

    if (typeof t.target === 'boolean') return val === t.target;
    if (t.min !== undefined) return val >= t.min;
    if (t.max !== undefined) return val <= t.max;
    return true;
  }

  // --- VYGOTSKY SCAFFOLDING & DIGITAL MKO GITA ---
  triggerGitaScaffoldingHint() {
    let hintText = '';
    let targetAction = null;

    if (this.activeMission && this.activeMission.targets) {
      const tg = this.activeMission.targets;
      if (tg.q1 && !this.isTargetMet(tg.q1)) {
        hintText = `💡 Petunjuk Gita: Ayo selesaikan target: ${tg.q1.text}! Tekan tombol tindakan di bawah!`;
      } else if (tg.q2 && !this.isTargetMet(tg.q2)) {
        hintText = `💡 Petunjuk Gita: Hebat! Lanjutkan target: ${tg.q2.text}! Diskusikan bersama tim!`;
      } else if (tg.q3 && !this.isTargetMet(tg.q3)) {
        hintText = `💡 Petunjuk Gita: Hampir selesai! Tuntaskan: ${tg.q3.text}!`;
      } else {
        hintText = '💡 Petunjuk Gita: Luar biasa! Semua tugas tercapai! Tekan tombol SELESAI di kanan bawah!';
      }
    } else {
      if (this.legacyMissionId === 1) {
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
      } else {
        hintText = '💡 Petunjuk Gita: Ayo selesaikan seluruh tugas di checklist kanan atas!';
      }
    }

    this.guideText.setText(hintText);
    this.guideFullSpeech = hintText;

    if (window.soundEngine) {
      this.setGitaSpeaking(true, 4500);
      window.soundEngine.playSuccess();
      window.soundEngine.playVO(`vo_sim_hint_m${this.legacyMissionId}`, hintText);
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
      if (this.textures.exists('gita_think')) {
        this.kikiSprite.setTexture('gita_think');
        this.kikiSprite.setDisplaySize(95, 95);
      }
      if (this.gitaEmote) this.gitaEmote.setText('😱');
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
      if (this.textures.exists('gita_thumbsup')) {
        this.kikiSprite.setTexture('gita_thumbsup');
        this.kikiSprite.setDisplaySize(95, 95);
      }
      if (this.gitaEmote) this.gitaEmote.setText('🌟');
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
      if (this.textures.exists('gita_idle')) {
        this.kikiSprite.setTexture('gita_idle');
        this.kikiSprite.setDisplaySize(95, 95);
      }
      if (this.gitaEmote) this.gitaEmote.setText('👀');
      this.isGitaWobbling = false;
      this.tweens.killTweensOf(this.kikiSprite);
      this.kikiSprite.setAngle(0);
    }
  }

  setGitaSpeaking(isSpeaking, duration = 4000) {
    if (!this.kikiSprite) return;
    if (isSpeaking && this.textures.exists('gita_talk')) {
      this.kikiSprite.setTexture('gita_talk');
      this.kikiSprite.setDisplaySize(95, 95);
      if (this.gitaEmote) this.gitaEmote.setText('🗣️');
      if (this.speakingTimer) this.speakingTimer.remove();
      this.speakingTimer = this.time.delayedCall(duration, () => {
        this.updateGitaEmbodiment();
      });
    } else {
      this.updateGitaEmbodiment();
    }
  }

  // --- 4. QUEST CHECKLIST HUD REAL-TIME (KANAN ATAS - PIAGET CONCRETE) ---
  createQuestChecklistHUD(width) {
    const boxW = 510;
    const boxH = 155;
    const boxX = width - boxW / 2 - 25;
    const boxY = 160;

    const questCard = this.add.rectangle(boxX, boxY, boxW, boxH, 0x07111e, 0.95).setDepth(15);
    questCard.setStrokeStyle(2, 0x10b981);

    // Header Pill
    const headPill = this.add.rectangle(boxX, boxY - 50, boxW - 28, 28, 0x064e3b).setDepth(16);
    headPill.setStrokeStyle(1.5, 0xf59e0b);
    this.add.text(boxX, boxY - 50, '📋 TUGAS PENYELAMATAN DETEKTIF', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '14px',
      color: '#fef08a',
      fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(17);

    this.questTextLines = [];
    for (let i = 0; i < 3; i++) {
      const rowY = boxY - 14 + (i * 32);
      const rowBg = this.add.rectangle(boxX, rowY, boxW - 28, 26, 0x0f172a, 0.85).setDepth(16);
      rowBg.setStrokeStyle(1, 0x1e293b);

      const qText = this.add.text(boxX - boxW / 2 + 24, rowY, '', {
        fontFamily: 'Nunito, sans-serif',
        fontSize: '14px',
        color: '#ffffff',
        fontStyle: 'bold'
      }).setOrigin(0, 0.5).setDepth(17);
      this.questTextLines.push(qText);
    }
  }

  updateQuestObjectives() {
    if (!this.questTextLines || this.questTextLines.length < 3) return;

    let q1Met = false, q2Met = false, q3Met = false;
    let t1 = '', t2 = '', t3 = '';

    if (this.activeMission && this.activeMission.targets) {
      const tg = this.activeMission.targets;
      const evalTarget = (t) => {
        if (!t) return { met: true, label: '' };
        let val = 0;
        if (t.key === 'health') val = this.ecoHealth;
        else if (t.key === 'waterLevel') val = this.waterLevel;
        else if (t.key === 'pesticideClean') val = this.pesticideClean;
        else if (t.key === 'trapsClean') val = this.trapsClean;
        else if (t.key === 'waste') val = this.organicWaste;
        else if (t.key === 'limbah') val = this.limbahLevel;
        else if (t.key === 'sampah') val = this.sampahLevel;
        else val = this.pop[t.key] !== undefined ? this.pop[t.key] : 0;

        let met = false;
        let label = '';
        if (typeof t.target === 'boolean') {
          met = (val === t.target);
          label = `${met ? '✅' : '⬜'} ${t.text}: ${met ? 'Aman & Bersih' : 'Perlu Bersihkan'}`;
        } else if (t.min !== undefined) {
          met = (val >= t.min);
          label = `${met ? '✅' : '⬜'} ${t.text}: ${val}${t.unit} (Min ${t.min})`;
        } else if (t.max !== undefined) {
          met = (val <= t.max);
          label = `${met ? '✅' : '⬜'} ${t.text}: ${val}${t.unit} (Maks ${t.max})`;
        }
        return { met, label };
      };

      const res1 = evalTarget(tg.q1);
      const res2 = evalTarget(tg.q2);
      const res3 = evalTarget(tg.q3);
      q1Met = res1.met; t1 = res1.label;
      q2Met = res2.met; t2 = res2.label;
      q3Met = res3.met; t3 = res3.label;
    } else if (this.legacyMissionId === 1) {
      // Misi 1: Ular & Tikus
      q1Met = this.pop.ular >= 20;
      t1 = `${q1Met ? '✅' : '⬜'} 🐍 Lepas Ular Sawah: ${this.pop.ular}/20 ekor (Min 20)`;

      q2Met = this.pop.tikus <= 30;
      t2 = `${q2Met ? '✅' : '⬜'} 🐀 Hama Tikus Terkendali: ${this.pop.tikus} ekor (Maks 30)`;

      q3Met = this.pop.padi >= 50;
      t3 = `${q3Met ? '✅' : '⬜'} 🌾 Tanaman Padi Subur: ${this.pop.padi}/50 rumpun (Min 50)`;

    } else if (this.legacyMissionId === 2) {
      // Misi 2: Racun Kimia & Katak
      q1Met = this.pop.katak >= 30;
      t1 = `${q1Met ? '✅' : '⬜'} 🐸 Pulihkan Katak Sawah: ${this.pop.katak}/30 ekor (Min 30)`;

      q2Met = this.pop.padi >= 60;
      t2 = `${q2Met ? '✅' : '⬜'} 🌾 Tanaman Padi Pulih: ${this.pop.padi}/60 rumpun (Min 60)`;

      q3Met = this.ecoHealth >= 75;
      t3 = `${q3Met ? '✅' : '⬜'} 🍃 Sawah Bebas Racun & Sehat (${this.ecoHealth}%)`;

    } else if (this.legacyMissionId === 3) {
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

  // --- 5. PANEL KONTROL ZONA BAWAH (CONTEXTUAL ACTION GATING - 4 KOLOM SIMETRIS) ---
  createTouchControls(width, height) {
    const panelH = 196;
    const panelY = height - panelH / 2 - 10;

    const controlPanel = this.add.rectangle(width / 2, panelY, width * 0.98, panelH, 0x090d16, 0.96);
    controlPanel.setStrokeStyle(2, 0x1e293b);

    // Label Header Zona Sentuh
    this.touchZoneHeader = this.add.text(width / 2, height - 188, '🎮 ZONA SENTUH IFP: PILIH TINDAKAN PENYELAMATAN KELOMPOK', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '16px',
      color: '#fef08a'
    }).setOrigin(0.5);

    // Progress Bar Visual Cooldown
    if (this.textures.exists('hud_cooldown_bar')) {
      this.cooldownBarFrame = this.add.image(width / 2, height - 168, 'hud_cooldown_bar')
        .setDisplaySize(380, 18)
        .setAlpha(0.7)
        .setVisible(false);
    }
    this.cooldownBarBg = this.add.rectangle(width / 2, height - 168, 360, 8, 0x1e293b).setVisible(false);
    this.cooldownBarFill = this.add.rectangle(width / 2 - 180, height - 168, 360, 8, 0x38bdf8).setOrigin(0, 0.5).setVisible(false);

    this.actionButtons = [];
    this.actionLabels = {};

    // KONFIGURASI 4 KOLOM SIMETRIS (3 KARTU AKSI + 1 TOMBOL SELESAI)
    const missionActions = this.getContextualActions();

    // 4 Kolom: lebar 390px, sela 70px, margin kiri-kanan tepat 75px
    const cardW = 390;
    const cardH = 138;
    const cardY = height - 88;
    const startX = 270;
    const cardSpacing = 460;

    missionActions.forEach((act, idx) => {
      const cx = startX + (idx * cardSpacing);

      const card = this.add.rectangle(cx, cardY, cardW, cardH, 0x0f172a, 0.96).setStrokeStyle(2, act.color);
      card.defaultColor = act.color;
      this.actionCards[act.id] = card;

      // Ikon Aksi (Sprite Gambar Nyata atau Emoji Fallback)
      if (act.iconAsset && this.textures.exists(act.iconAsset)) {
        this.add.image(cx - 150, cardY - 34, act.iconAsset).setDisplaySize(44, 44);
      } else {
        this.add.text(cx - 150, cardY - 34, act.icon, { fontSize: '36px' }).setOrigin(0.5);
      }

      // Judul Tindakan
      this.add.text(cx - 115, cardY - 44, act.title, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '17px',
        color: '#ffffff',
        fontStyle: 'bold'
      }).setOrigin(0, 0.5);

      // Subtitle / Peran Ekologis
      this.add.text(cx - 115, cardY - 24, act.desc, {
        fontFamily: 'Nunito, sans-serif',
        fontSize: '13px',
        color: '#94a3b8',
        fontStyle: 'bold'
      }).setOrigin(0, 0.5);

      // Tombol Aksi Sentuh
      const btnAction = this.add.rectangle(cx, cardY + 10, cardW - 40, 38, act.btnColor)
        .setInteractive({ useHandCursor: true });
      btnAction.setStrokeStyle(2, 0xffffff);

      const btnLabel = this.add.text(cx, cardY + 10, act.btnText, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '16px',
        color: '#ffffff',
        fontStyle: 'bold'
      }).setOrigin(0.5);

      // Label Status & Target Kuota Terintegrasi (Spatial Contiguity Principle)
      const statusPill = this.add.rectangle(cx, cardY + 46, cardW - 50, 24, 0x07111e).setStrokeStyle(1, act.color, 0.5);
      const statusText = this.add.text(cx, cardY + 46, act.statusGetter(), {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '13px',
        color: '#fef08a'
      }).setOrigin(0.5);
      this.actionLabels[act.id] = { textObj: statusText, getter: act.statusGetter };

      btnAction.on('pointerdown', () => {
        btnAction.setScale(0.96);
        act.handler(btnAction);
      });
      btnAction.on('pointerup', () => btnAction.setScale(1.0));

      this.actionButtons.push(btnAction);
    });

    // KOLOM 4: TOMBOL SELESAI (CEK HASIL PENYELIDIKAN) - SEIMBANG & SIMETRIS DI SISI KANAN
    const finishX = 1650;
    const finishCard = this.add.rectangle(finishX, cardY, cardW, cardH, 0x064e3b, 0.96).setStrokeStyle(3, 0xf59e0b);

    // Ikon & Header Kartu Selesai
    this.add.text(finishX - 150, cardY - 34, '🏆', { fontSize: '36px' }).setOrigin(0.5);
    this.add.text(finishX - 115, cardY - 44, 'SELESAI MISI', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '17px',
      color: '#fef08a',
      fontStyle: 'bold'
    }).setOrigin(0, 0.5);

    this.add.text(finishX - 115, cardY - 24, 'Periksa keseimbangan ekosistem', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '13px',
      color: '#cbd5e1',
      fontStyle: 'bold'
    }).setOrigin(0, 0.5);

    this.btnVerify = this.add.rectangle(finishX, cardY + 10, cardW - 40, 38, 0x10b981)
      .setInteractive({ useHandCursor: true });
    this.btnVerify.setStrokeStyle(2, 0xffffff);

    this.add.text(finishX, cardY + 10, '✅ CEK HASIL PENYELIDIKAN 🔍', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '15px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const finishPill = this.add.rectangle(finishX, cardY + 46, cardW - 50, 24, 0x022c22).setStrokeStyle(1, 0xf59e0b, 0.5);
    this.add.text(finishX, cardY + 46, '⭐ Evaluasi C2 & Bintang Detektif', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '13px',
      color: '#fef08a'
    }).setOrigin(0.5);

    this.btnVerify.on('pointerdown', () => {
      this.btnVerify.setScale(0.96);
      this.checkMissionCompletion();
    });
    this.btnVerify.on('pointerup', () => this.btnVerify.setScale(1.0));
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

    // A. EKOSISTEM HUTAN TROPIS
    if (mid === 'hutan_m1') {
      return [
        {
          id: 'air_rimba',
          iconAsset: 'icon_kemarau',
          icon: '💧',
          title: 'ALIRKAN MATA AIR',
          desc: 'Segarkan mata air rimba kering',
          btnText: '🚿 ALIRKAN AIR (+25%)',
          color: 0x0284c7,
          btnColor: 0x0369a1,
          statusGetter: () => `💧 Mata Air: ${this.waterLevel}% (🎯 Min 60%)`,
          handler: (btn) => this.applyIrrigationAction(btn)
        },
        {
          id: 'tanam_pohon',
          iconAsset: 'pohon_hutan',
          icon: '🌲',
          title: 'REBOISASI POHON RIMBA',
          desc: 'Tunas pohon penyerap karbon',
          btnText: '➕ TANAM 10 POHON',
          color: 0x16a34a,
          btnColor: 0x15803d,
          statusGetter: () => `🌲 Pohon: ${this.pop.pohon || 0}/45 pohon (🎯 Min 45)`,
          handler: (btn) => this.applyEcosystemAction('pohon', +10, btn, '🌲 Reboisasi Tunas Pohon Rimba Berhasil!')
        },
        {
          id: 'urai_abu',
          iconAsset: 'jamur_hutan',
          icon: '🍄',
          title: 'SUBURKAN ABU SERASAH',
          desc: 'Pengurai tanah rimba alami',
          btnText: '➕ BANTU PENGURAI',
          color: 0x7e22ce,
          btnColor: 0x6b21a8,
          statusGetter: () => `🍄 Jamur: ${this.pop.jamur || 0} koloni`,
          handler: (btn) => this.applyEcosystemAction('jamur', +10, btn, '🍄 Jamur Rimba Mengurai Serasah!')
        }
      ];
    } else if (mid === 'hutan_m2') {
      return [
        {
          id: 'rawat_harimau',
          iconAsset: 'harimau',
          icon: '🐅',
          title: 'SELAMATKAN HARIMAU',
          desc: 'Predator puncak rimba Nusantara',
          btnText: '➕ RAWAT 4 HARIMAU',
          color: 0xd97706,
          btnColor: 0xb45309,
          statusGetter: () => `🐅 Harimau: ${this.pop.harimau || 0}/10 ekor (🎯 Min 10)`,
          handler: (btn) => this.applyEcosystemAction('harimau', +4, btn, '🐅 Harimau Sumatera Diselamatkan & Dirawat!')
        },
        {
          id: 'tanam_pohon',
          iconAsset: 'pohon_hutan',
          icon: '🌲',
          title: 'TANAM POHON RIMBA',
          desc: 'Kembalikan habitat rusa & harimau',
          btnText: '➕ TANAM 10 POHON',
          color: 0x16a34a,
          btnColor: 0x15803d,
          statusGetter: () => `🌲 Pohon: ${this.pop.pohon || 0}/50 pohon (🎯 Min 50)`,
          handler: (btn) => this.applyEcosystemAction('pohon', +10, btn, '🌲 Tunas Pohon Rimba Ditanam!')
        },
        {
          id: 'sita_jerat',
          iconAsset: 'icon_deforestasi',
          icon: '🚫',
          title: 'SITA JERAT PEMBURU',
          desc: 'Amankan hutan dari jeratan liar',
          btnText: '✨ BERSIHKAN JERAT',
          color: 0xef4444,
          btnColor: 0xdc2626,
          statusGetter: () => (this.trapsClean ? '🚫 Jerat: Bebas Jerat (✅ Aman)' : '🚫 Jerat: Ada Jeratan (⚠️ Sita)'),
          handler: (btn) => {
            this.trapsClean = true;
            this.showFloatingNotice('✨ Hutan Rimba Bebas dari Jerat Liar!', 0x34d399);
            this.calculateEcosystemHealth();
            this.updateQuestObjectives();
            this.startActionCooldown();
          }
        }
      ];
    }

    // B. EKOSISTEM SUNGAI AIR TAWAR
    if (mid === 'sungai_m1') {
      return [
        {
          id: 'buka_hulu',
          iconAsset: 'icon_kemarau',
          icon: '💧',
          title: 'BUKA PINTU AIR HULU',
          desc: 'Alirkan air segar sungai',
          btnText: '🚿 ALIRKAN AIR (+25%)',
          color: 0x0284c7,
          btnColor: 0x0369a1,
          statusGetter: () => `💧 Air Hulu: ${this.waterLevel}% (🎯 Min 65%)`,
          handler: (btn) => this.applyIrrigationAction(btn)
        },
        {
          id: 'bersih_gulma',
          iconAsset: 'eceng_gondok',
          icon: '🌿',
          title: 'ANGKAT ECENG GONDOK',
          desc: 'Buka permukaan air untuk oksigen',
          btnText: '✂️ ANGKAT 20 GULMA',
          color: 0x059669,
          btnColor: 0x047857,
          statusGetter: () => `🌿 Gulma: ${this.pop.gulma || 0} rumpun (🎯 Maks 25)`,
          handler: (btn) => this.applyEcosystemAction('gulma', -20, btn, '🌿 Eceng Gondok Diangkat! Oksigen Masuk Air!')
        },
        {
          id: 'tanam_teratai',
          iconAsset: 'ikan_gabus',
          icon: '🐟',
          title: 'TEBAR IKAN TAWAR',
          desc: 'Ikan bernapas lega di air segar',
          btnText: '➕ TEBAR 10 IKAN',
          color: 0x0284c7,
          btnColor: 0x0369a1,
          statusGetter: () => `🐟 Ikan: ${this.pop.ikan || 0}/45 ekor (🎯 Min 45)`,
          handler: (btn) => this.applyEcosystemAction('ikan', +10, btn, '🐟 Benih Ikan Tawar Ditebar di Sungai!')
        }
      ];
    } else if (mid === 'sungai_m2') {
      return [
        {
          id: 'saring_limbah',
          iconAsset: 'icon_limbah_danau',
          icon: '🧪',
          title: 'SARING LIMBAH PABRIK',
          desc: 'Netralkan detergen & racun kimia',
          btnText: '🧪 SARING LIMBAH (-20%)',
          color: 0x9333ea,
          btnColor: 0x7e22ce,
          statusGetter: () => `🧪 Limbah: ${this.limbahLevel}% (🎯 Maks 15%)`,
          handler: (btn) => {
            this.limbahLevel = Math.max(0, this.limbahLevel - 20);
            this.showFloatingNotice('🧪 Limbah Pabrik Disaring Bersih!', 0x38bdf8);
            this.calculateEcosystemHealth();
            this.updateQuestObjectives();
            this.startActionCooldown();
          }
        },
        {
          id: 'tebar_ikan',
          iconAsset: 'ikan_gabus',
          icon: '🐟',
          title: 'TEBAR IKAN TAWAR',
          desc: 'Kembalikan populasi ikan tawar',
          btnText: '➕ TEBAR 10 IKAN',
          color: 0x0284c7,
          btnColor: 0x0369a1,
          statusGetter: () => `🐟 Ikan: ${this.pop.ikan || 0}/40 ekor (🎯 Min 40)`,
          handler: (btn) => this.applyEcosystemAction('ikan', +10, btn, '🐟 Benih Ikan Tawar Ditebar di Sungai!')
        },
        {
          id: 'rawat_bangau',
          iconAsset: 'bangau',
          icon: '🪶',
          title: 'LINDUNGI BANGAU',
          desc: 'Burung pemangsa penjaga sungai',
          btnText: '➕ LINDUNGI 4 BANGAU',
          color: 0x0d9488,
          btnColor: 0x0f766e,
          statusGetter: () => `🪶 Bangau: ${this.pop.bangau || 0}/12 ekor (🎯 Min 12)`,
          handler: (btn) => this.applyEcosystemAction('bangau', +4, btn, '🪶 Burung Bangau Dilindungi di Sungai!')
        }
      ];
    }

    // C. EKOSISTEM LAUT TERUMBU KARANG
    if (mid === 'laut_m1') {
      return [
        {
          id: 'tanam_karang',
          iconAsset: 'karang',
          icon: '🪸',
          title: 'TRANSPLANTASI KARANG',
          desc: 'Tanam bibit karang tahan suhu',
          btnText: '➕ TANAM 12 KARANG',
          color: 0x0284c7,
          btnColor: 0x0369a1,
          statusGetter: () => `🪸 Karang: ${this.pop.karang || 0}/45 koloni (🎯 Min 45)`,
          handler: (btn) => this.applyEcosystemAction('karang', +12, btn, '🪸 Bibit Karang Sehat Ditransplantasikan!')
        },
        {
          id: 'sebar_ikan',
          iconAsset: 'ikan_kecil',
          icon: '🐠',
          title: 'PULIHKAN IKAN KARANG',
          desc: 'Ikan badut & herbivora karang',
          btnText: '➕ PULIHKAN 15 IKAN',
          color: 0x10b981,
          btnColor: 0x059669,
          statusGetter: () => `🐠 Ikan: ${this.pop.ikan || 0}/50 ekor (🎯 Min 50)`,
          handler: (btn) => this.applyEcosystemAction('ikan', +15, btn, '🐠 Kawanan Ikan Karang Menghuni Karang Baru!')
        },
        {
          id: 'bantu_pengurai',
          iconAsset: 'pengurai_laut',
          icon: '🧫',
          title: 'MIKROBA PENGURAI LAUT',
          desc: 'Jaga kejernihan air samudra',
          btnText: '➕ BANTU PENGURAI',
          color: 0x0d9488,
          btnColor: 0x0f766e,
          statusGetter: () => `🧫 Pengurai: ${this.pop.pengurai || 0}/20 koloni`,
          handler: (btn) => this.applyEcosystemAction('pengurai', +10, btn, '🧫 Mikroba Pengurai Menjaga Air Jernih!')
        }
      ];
    } else if (mid === 'laut_m2') {
      return [
        {
          id: 'sita_bom',
          iconAsset: 'icon_bom_laut',
          icon: '💣',
          title: 'SITA BOM IKAN',
          desc: 'Hentikan bom & selamatkan karang',
          btnText: '💣 REHABILITASI KARANG',
          color: 0xd97706,
          btnColor: 0xb45309,
          statusGetter: () => `🪸 Karang: ${this.pop.karang || 0}/50 koloni (🎯 Min 50)`,
          handler: (btn) => this.applyEcosystemAction('karang', +15, btn, '💣 Bom Ikan Dilarang! Terumbu Karang Dilindungi!')
        },
        {
          id: 'bersih_plastik',
          iconAsset: 'icon_plastik_laut',
          icon: '🗑️',
          title: 'ANGKUT SAMPAH PLASTIK',
          desc: 'Bebaskan samudra dari jerat sampah',
          btnText: '🗑️ ANGKUT SAMPAH (-20%)',
          color: 0x0284c7,
          btnColor: 0x0369a1,
          statusGetter: () => `🗑️ Sampah: ${this.sampahLevel}% (🎯 Maks 15%)`,
          handler: (btn) => {
            this.sampahLevel = Math.max(0, this.sampahLevel - 20);
            this.showFloatingNotice('🗑️ Sampah Plastik Samudra Diangkut Bersih!', 0x38bdf8);
            this.calculateEcosystemHealth();
            this.updateQuestObjectives();
            this.startActionCooldown();
          }
        },
        {
          id: 'rawat_penyu',
          iconAsset: 'penyu',
          icon: '🐢',
          title: 'SELAMATKAN PENYU',
          desc: 'Rawat penyu yang terjerat plastik',
          btnText: '➕ RAWAT 3 PENYU',
          color: 0x16a34a,
          btnColor: 0x15803d,
          statusGetter: () => `🐢 Penyu: ${this.pop.penyu || 0}/8 ekor (🎯 Min 8)`,
          handler: (btn) => this.applyEcosystemAction('penyu', +3, btn, '🐢 Penyu Laut Dilepas Bebas ke Samudra!')
        }
      ];
    }

    // D. EKOSISTEM SAWAH (DEFAULT / FALLBACK)
    if (mid === 'sawah_m1' || this.legacyMissionId === 1 || this.legacyMissionId === 3) {
      return [
        {
          id: 'air',
          iconAsset: 'icon_kemarau',
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
          iconAsset: 'padi_subur',
          icon: '🌾',
          title: 'TANAM TUNAS PADI',
          desc: 'Tumbuh subur jika air cukup',
          btnText: '➕ TANAM 10 PADI',
          color: 0x16a34a,
          btnColor: 0x15803d,
          statusGetter: () => `🌾 Padi: ${this.pop.padi}/45 rumpun (🎯 Min 45)`,
          handler: (btn) => this.applyEcosystemAction('padi', +10, btn, '🌾 Padi Tumbuh Segar Menghijau!')
        },
        {
          id: 'ular',
          iconAsset: 'ular',
          icon: '🐍',
          title: 'JAGA ULAR SAWAH',
          desc: 'Predator pemburu hama tikus',
          btnText: '➕ LEPAS 10 ULAR',
          color: 0x0d9488,
          btnColor: 0x0f766e,
          statusGetter: () => `🐍 Ular: ${this.pop.ular}/10 ekor (🎯 Min 10)`,
          handler: (btn) => this.applyEcosystemAction('ular', +10, btn, '🐍 Ular Sawah Menjaga Padi dari Tikus!')
        }
      ];
    } else if (mid === 'sawah_m2' || this.legacyMissionId === 2) {
      return [
        {
          id: 'ular',
          iconAsset: 'ular',
          icon: '🐍',
          title: 'LEPAS ULAR SAWAH',
          desc: 'Predator pengendali tikus',
          btnText: '➕ LEPAS 10 ULAR',
          color: 0x0d9488,
          btnColor: 0x0f766e,
          statusGetter: () => `🐍 Ular: ${this.pop.ular}/20 ekor (🎯 Min 20)`,
          handler: (btn) => this.applyEcosystemAction('ular', +10, btn, '🐍 Ular Dilepas ke Sawah! Memburu Tikus!')
        },
        {
          id: 'katak',
          iconAsset: 'katak',
          icon: '🐸',
          title: 'LEPAS KATAK SAWAH',
          desc: 'Sahabat petani pemakan serangga',
          btnText: '➕ LEPAS 10 KATAK',
          color: 0x16a34a,
          btnColor: 0x15803d,
          statusGetter: () => `🐸 Katak: ${this.pop.katak}/25 ekor (🎯 Min 25)`,
          handler: (btn) => this.applyEcosystemAction('katak', +10, btn, '🐸 Katak Sahabat Petani Memburu Serangga!')
        },
        {
          id: 'bersih_racun',
          iconAsset: 'icon_pestisida',
          icon: '🍃',
          title: 'BERSIHKAN RESIDU RACUN',
          desc: 'Netralkan residu racun kimia',
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
    } else {
      // Misi 4: Jamur Pengurai & Jerami
      return [
        {
          id: 'jamur',
          iconAsset: 'jamur',
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
          iconAsset: 'bangkai',
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
          iconAsset: 'padi_subur',
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

    if (this.cooldownBarFrame) this.cooldownBarFrame.setVisible(true);
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
        if (this.cooldownBarFrame) this.cooldownBarFrame.setVisible(false);
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
    let noticeText = '💧 Pintu Air Dibuka! Sawah Terairi Segar (+25%)';

    if (this.activeEcosystemId === 'hutan') {
      this.pop.pohon = Math.min(100, (this.pop.pohon || 0) + 10);
      noticeText = '💧 Mata Air Rimba Mengalir! Tunas Pohon Segar (+25%)';
    } else if (this.activeEcosystemId === 'sungai') {
      this.pop.teratai = Math.min(100, (this.pop.teratai || 0) + 10);
      noticeText = '💧 Pintu Air Hulu Dibuka! Aliran Sungai Segar (+25%)';
    } else {
      this.pop.padi = Math.min(100, (this.pop.padi || 0) + 10);
      noticeText = '💧 Pintu Air Dibuka! Sawah Terairi Segar (+25%)';
    }

    if (window.soundEngine) window.soundEngine.playTone(650, 'sine', 0.15);
    this.showFloatingNotice(noticeText, 0x38bdf8);

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

  // --- 7. KALKULASI KESEHATAN EKOSISTEM DINAMIS ---
  calculateEcosystemHealth() {
    let score = 25;
    let feedback = null;

    if (this.activeMission && this.activeMission.targets) {
      const tg = this.activeMission.targets;
      let completedCount = 0;
      ['q1', 'q2', 'q3'].forEach(k => {
        if (this.isTargetMet(tg[k])) completedCount++;
      });
      score = 25 + (completedCount * 25);
    } else {
      score = 55;
      if (this.pop.padi < 30) score -= 30; else if (this.pop.padi >= 60) score += 15;
      if (this.pop.tikus > 40 && this.pop.ular < 20) score -= 35; else if (this.pop.ular >= 20 && this.pop.tikus <= 35) score += 15;
      if (this.pop.katak < 20) score -= 20; else if (this.pop.katak >= 30) score += 10;
    }

    this.ecoHealth = Math.max(10, Math.min(100, score));

    if (this.ecoHealth >= 75) {
      this.ecoMood = '😊 SEHAT';
    } else if (this.ecoHealth >= 45) {
      this.ecoMood = '⚠️ WASPADA';
    } else {
      this.ecoMood = '😱 BAHAYA';
    }

    const hpBarWidth = this.hpBarMaxWidth || 424;
    if (this.hpBarFill) {
      this.hpBarFill.width = (hpBarWidth * this.ecoHealth) / 100;
      this.hpBarFill.setFillStyle(this.ecoHealth >= 75 ? 0x22c55e : (this.ecoHealth >= 45 ? 0xf59e0b : 0xef4444));
    }
    if (this.moodText) {
      this.moodText.setText(`${this.ecoMood} (${this.ecoHealth}%)`);
      this.moodText.setColor(this.ecoHealth >= 75 ? '#86efac' : (this.ecoHealth >= 45 ? '#fef08a' : '#f87171'));
    }

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

    if (this.ecoHealth >= 75) {
      feedback = 'Hebat! Ekosistem kembali seimbang! Tekan "SELESAI" untuk melihat hasil!';
    } else if (this.ecoHealth < 45) {
      if (!this.hasTriggeredDangerVO) {
        this.hasTriggeredDangerVO = true;
        if (window.soundEngine) {
          window.soundEngine.playVO('vo_sim_danger_alert', 'Awas! Ekosistem dalam kondisi bahaya! Perhatikan komponen yang hilang dan segera lakukan aksi penyelamatan!');
        }
      }
    }

    if (feedback && this.guideText) {
      this.guideText.setText('📌 ' + feedback);
      this.guideFullSpeech = feedback;
    }
  }

  triggerBiteFxOnSprites(spriteArray) {
    if (!spriteArray || spriteArray.length === 0) return;
    const activeSprites = spriteArray.filter(s => s && s.active);
    if (activeSprites.length === 0) return;
    const victim = Phaser.Utils.Array.GetRandom(activeSprites);
    if (!victim) return;

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

  // --- 8. DINAMIKA PREDIASI OTOMATIS & GAME FEEL (TEMPORAL CONTIGUITY PRINCIPLE) ---
  simulationStep() {
    if (this.isMissionComplete) return;

    this.timeRemaining--;
    const mins = Math.floor(this.timeRemaining / 60);
    const secs = this.timeRemaining % 60;
    const timeStr = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    this.timerText.setText(`⏱️ WAKTU: ${timeStr}`);

    // Reaksi Ekologi Otomatis Setiap 3 Detik (Multi-Bioma)
    if (this.timeRemaining % 3 === 0 && !this.isActionCooldown) {
      let stateChanged = false;
      const eco = this.activeEcosystemId;

      if (eco === 'sawah') {
        // 1. Jika hama tikus banyak & ular sedikit -> Tikus makan padi
        if (this.pop.tikus > 40 && (this.pop.ular || 0) < 15 && this.pop.padi > 15) {
          this.pop.padi = Math.max(5, this.pop.padi - 2);
          this.showFloatingNotice('🐀 Tikus memakan batang padi! (-2 Padi)', 0xf87171);
          stateChanged = true;
        }

        // 2. Jika ular mencukupi -> Ular secara alami memangsa tikus (Predasi Visual Sinkron)
        if ((this.pop.ular || 0) >= 20 && this.pop.tikus > 25) {
          const eatenRats = Math.min(4, this.pop.tikus - 15);
          if (eatenRats > 0) {
            this.pop.tikus -= eatenRats;
            this.showFloatingNotice(`🐍 Ular sawah memangsa tikus! (-${eatenRats} Tikus)`, 0x34d399);
            if (window.soundEngine) window.soundEngine.playChomp();
            this.triggerBiteFxOnSprites(this.tikusSprites);
            stateChanged = true;
          }
        }

        // 3. Jika sawah kekeringan (Misi 3 / M1) -> Padi layu
        if ((this.legacyMissionId === 3 || this.legacyMissionId === 1) && this.waterLevel < 35 && this.pop.padi > 15) {
          this.pop.padi = Math.max(5, this.pop.padi - 2);
          this.showFloatingNotice('☀️ Padi layu karena kekurangan air irigasi! (-2 Padi)', 0xf59e0b);
          stateChanged = true;
        }

        // 4. Jika katak cukup banyak (Misi 2) -> Katak memangsa serangga, padi memulih
        if (this.legacyMissionId === 2 && (this.pop.katak || 0) >= 25 && this.pop.padi < 80) {
          this.pop.padi = Math.min(80, this.pop.padi + 2);
          this.showFloatingNotice('🐸 Katak memburu serangga! Padi bertambah (+2 Padi)', 0x34d399);
          if (window.soundEngine) window.soundEngine.playChomp();
          stateChanged = true;
        }
      } else if (eco === 'hutan') {
        // 1. Rusa memakan tunas pohon jika pemangsa harimau sedikit
        if ((this.pop.rusa || 0) > 25 && (this.pop.harimau || 0) < 6 && (this.pop.pohon || 0) > 15) {
          this.pop.pohon = Math.max(5, this.pop.pohon - 2);
          this.showFloatingNotice('🦌 Kawanan rusa memakan tunas rimba! (-2 Pohon)', 0xf87171);
          stateChanged = true;
        }

        // 2. Harimau menjaga rimba dan memangsa rusa
        if ((this.pop.harimau || 0) >= 8 && (this.pop.rusa || 0) > 20) {
          const eatenPrey = Math.min(3, this.pop.rusa - 15);
          if (eatenPrey > 0) {
            this.pop.rusa -= eatenPrey;
            this.showFloatingNotice(`🐅 Harimau menjaga rimba dan memangsa rusa! (-${eatenPrey} Rusa)`, 0x34d399);
            if (window.soundEngine) window.soundEngine.playChomp();
            this.triggerBiteFxOnSprites(this.tikusSprites);
            stateChanged = true;
          }
        }

        // 3. Pohon rimba layu saat kemarau mata air kering
        if (this.waterLevel < 35 && (this.pop.pohon || 0) > 15) {
          this.pop.pohon = Math.max(5, this.pop.pohon - 2);
          this.showFloatingNotice('☀️ Pohon rimba layu kekurangan mata air! (-2 Pohon)', 0xf59e0b);
          stateChanged = true;
        }
      } else if (eco === 'sungai') {
        // 1. Gulma lebat menutup permukaan air, kadar oksigen anjlok
        if ((this.pop.gulma || 0) > 40 && (this.pop.ikan || 0) > 20) {
          const lostFish = Math.min(3, this.pop.ikan - 15);
          if (lostFish > 0) {
            this.pop.ikan -= lostFish;
            this.showFloatingNotice(`🌿 Eceng gondok menutup air! Ikan lemas kekurangan oksigen! (-${lostFish} Ikan)`, 0xf87171);
            if (window.soundEngine) window.soundEngine.playWarning();
            stateChanged = true;
          }
        }

        // 2. Air hulu surut membuat teratai layu
        if (this.waterLevel < 35 && (this.pop.teratai || 0) > 10) {
          this.pop.teratai = Math.max(5, this.pop.teratai - 2);
          this.showFloatingNotice('☀️ Aliran surut! Tanaman air teratai layu! (-2 Teratai)', 0xf59e0b);
          stateChanged = true;
        }

        // 3. Limbah kimia beracun mengikis populasi ikan
        if (this.limbahLevel > 35 && (this.pop.ikan || 0) > 15) {
          this.pop.ikan = Math.max(5, this.pop.ikan - 2);
          this.showFloatingNotice('🧪 Limbah kimia meracuni air! Ikan kecil berkurang! (-2 Ikan)', 0xf87171);
          stateChanged = true;
        }

        // 4. Burung bangau memangsa ikan air tawar jika populasi seimbang
        if ((this.pop.bangau || 0) >= 8 && (this.pop.ikan || 0) > 30) {
          const eatenFish = Math.min(3, this.pop.ikan - 20);
          if (eatenFish > 0) {
            this.pop.ikan -= eatenFish;
            this.showFloatingNotice(`🪶 Burung bangau memangsa ikan sungai! (-${eatenFish} Ikan)`, 0x34d399);
            if (window.soundEngine) window.soundEngine.playChomp();
            this.triggerBiteFxOnSprites(this.tikusSprites);
            stateChanged = true;
          }
        }
      } else if (eco === 'laut') {
        // 1. Karang memutih dan rusak membuat ikan karang berkurang
        if ((this.pop.karang || 0) < 30 && (this.pop.ikan || 0) > 20) {
          const lostFish = Math.min(3, this.pop.ikan - 15);
          if (lostFish > 0) {
            this.pop.ikan -= lostFish;
            this.showFloatingNotice(`🪸 Karang memutih! Ikan karang kehilangan rumah! (-${lostFish} Ikan)`, 0xf87171);
            if (window.soundEngine) window.soundEngine.playWarning();
            stateChanged = true;
          }
        }

        // 2. Hiu memangsa ikan secara alami untuk menyeimbangkan samudra
        if ((this.pop.hiu || 0) >= 3 && (this.pop.ikan || 0) > 35) {
          const eatenFish = Math.min(4, this.pop.ikan - 25);
          if (eatenFish > 0) {
            this.pop.ikan -= eatenFish;
            this.showFloatingNotice(`🦈 Hiu menjaga keseimbangan samudra! (-${eatenFish} Ikan)`, 0x34d399);
            if (window.soundEngine) window.soundEngine.playChomp();
            this.triggerBiteFxOnSprites(this.tikusSprites);
            stateChanged = true;
          }
        }

        // 3. Sampah plastik laut menjerat penyu jika limbah sampah tinggi
        if (this.sampahLevel > 35 && (this.pop.penyu || 0) > 3) {
          this.pop.penyu = Math.max(2, this.pop.penyu - 1);
          this.showFloatingNotice('🗑️ Sampah plastik menjerat penyu samudra! (-1 Penyu)', 0xf87171);
          stateChanged = true;
        }
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

  // --- CSCL (COMPUTER-SUPPORTED COLLABORATIVE LEARNING): FITUR TANYA TEMAN (PENASIHAT MEJA) ---
  triggerCoPilotCallout() {
    const { width, height } = this.scale;

    // 1. Jeda Simulasi Timer
    if (this.simTimer) this.simTimer.paused = true;

    // 2. Bunyikan Bel Kelas & Panggilan Gita (vo_sim_copilot_call)
    if (window.soundEngine) {
      window.soundEngine.playChime();
      this.time.delayedCall(450, () => {
        window.soundEngine.playVO('vo_sim_copilot_call', 'Panggilan untuk Penasihat Meja! Petugas Layar butuh saran. Diskusikan, lalu angkat kartu warna kalian sekarang!');
      });
    }

    const modalContainer = this.add.container(0, 0).setDepth(201);

    // Dimmer Backdrop
    const backdrop = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.85)
      .setInteractive()
      .setDepth(200);

    // Box Utama Modal
    const boxW = 1220;
    const boxH = 680;
    const modalBox = this.add.rectangle(width / 2, height / 2, boxW, boxH, 0x064e3b, 0.98)
      .setStrokeStyle(4, 0xf59e0b);
    const innerBorder = this.add.rectangle(width / 2, height / 2, boxW - 12, boxH - 12)
      .setStrokeStyle(2, 0xfef08a, 0.4);
    modalContainer.add([modalBox, innerBorder]);

    // Tombol Close X Pojok Kanan Atas
    const btnClose = this.add.rectangle(width / 2 + boxW / 2 - 38, height / 2 - boxH / 2 + 38, 46, 46, 0xef4444)
      .setInteractive({ useHandCursor: true });
    btnClose.setStrokeStyle(2, 0xffffff);
    const tClose = this.add.text(width / 2 + boxW / 2 - 38, height / 2 - boxH / 2 + 38, '✕', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '26px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    modalContainer.add([btnClose, tClose]);

    // Avatar Gita Pemanggil Kelas
    const gitaAvatarKey = this.textures.exists('gita_talk') ? 'gita_talk' : 'gita_idle';
    const gitaAvatar = this.add.image(width / 2 - boxW / 2 + 95, height / 2 - boxH / 2 + 95, gitaAvatarKey)
      .setDisplaySize(125, 125);
    modalContainer.add(gitaAvatar);

    // Header Panggilan Kelas
    const titleText = this.add.text(width / 2 + 40, height / 2 - 275, '📢 PANGGILAN PENASIHAT MEJA: DISKUSI & VOTING', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '28px',
      color: '#fef08a',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    modalContainer.add(titleText);

    const subText = this.add.text(width / 2 + 40, height / 2 - 235, 'Petugas Layar butuh saran! Teman di meja, diskusikan lalu angkat kartu fisik kalian!', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '18px',
      color: '#cbd5e1'
    }).setOrigin(0.5);
    modalContainer.add(subText);

    // Timer Countdown Diskusi 15 Detik
    let voteSeconds = 15;
    const timerBox = this.add.rectangle(width / 2, height / 2 - 180, 380, 44, 0x022c22)
      .setStrokeStyle(2, 0xf59e0b);
    const timerText = this.add.text(width / 2, height / 2 - 180, `⏱️ WAKTU VOTING: ${voteSeconds} DETIK`, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '19px',
      color: '#fef08a',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    modalContainer.add([timerBox, timerText]);

    const voteTimer = this.time.addEvent({
      delay: 1000,
      repeat: 15,
      callback: () => {
        voteSeconds--;
        if (voteSeconds >= 0) {
          timerText.setText(`⏱️ WAKTU VOTING: ${voteSeconds} DETIK`);
          if (voteSeconds <= 5 && voteSeconds > 0) {
            timerText.setColor('#f87171');
            if (window.soundEngine) window.soundEngine.playTone(600, 'square', 0.05, 0.1);
          }
        }
      }
    });

    // 3 KARTU VOTING SESUAI DENGAN KARTU FISIK LKPD KELAS & ASET VISUAL
    const votingOptions = [
      {
        assetKey: 'card_voting_hijau',
        color: 0x064e3b,
        border: 0x22c55e,
        tag: '🟢 KARTU HIJAU',
        title: 'TAMBAH PEMANGSA / JAMUR',
        desc: 'Tambah ular, katak, atau jamur.',
        actionTarget: this.legacyMissionId === 4 ? 'jamur' : (this.legacyMissionId === 2 ? 'katak' : 'ular'),
        recText: 'Rekomendasi: Tambah Pemangsa / Jamur'
      },
      {
        assetKey: 'card_voting_kuning',
        color: 0x78350f,
        border: 0xf59e0b,
        tag: '🟡 KARTU KUNING',
        title: 'ALIRKAN AIR',
        desc: 'Buka pintu air untuk tanah yang retak dan kering.',
        actionTarget: 'air',
        recText: 'Rekomendasi: Alirkan Air ke Sawah'
      },
      {
        assetKey: 'card_voting_merah',
        color: 0x7f1d1d,
        border: 0xef4444,
        tag: '🔴 KARTU MERAH',
        title: 'KURANGI HAMA & RACUN',
        desc: 'Kurangi tikus atau bersihkan sisa racun.',
        actionTarget: this.legacyMissionId === 2 ? 'bersih_racun' : 'tikus_monitor',
        recText: 'Rekomendasi: Kurangi Hama & Bersihkan Racun'
      }
    ];

    const cardY = height / 2 + 55;
    const cardW = 345;
    const cardH = 340;
    const cardSpacing = 375;
    const startX = width / 2 - cardSpacing;

    const finalizeVote = (chosen) => {
      voteTimer.remove();
      if (window.soundEngine) window.soundEngine.playSuccess();
      modalContainer.destroy(true);
      backdrop.destroy();

      if (this.simTimer) this.simTimer.paused = false;

      this.showFloatingNotice(`📢 KEPUTUSAN VOTING KELAS: ${chosen.tag}!`, 0x34d399);
      this.guideText.setText(`💡 Saran Kelas 5A: ${chosen.recText}! Lakukan tindakan ini!`);
      this.guideFullSpeech = `Hasil diskusi kelas memilih ${chosen.tag}! Rekomendasi tindakan: ${chosen.recText}!`;

      let voKey = 'vo_sim_vote_green';
      let voFallback = 'Kartu Hijau menang! Ayo tambahkan hewan pemangsa atau jamur ke sawah!';
      if (chosen.tag.includes('KUNING')) {
        voKey = 'vo_sim_vote_yellow';
        voFallback = 'Kartu Kuning menang! Ayo buka pintu air dan alirkan air ke sawah!';
      } else if (chosen.tag.includes('MERAH')) {
        voKey = 'vo_sim_vote_red';
        voFallback = 'Kartu Merah menang! Ayo kurangi tikus dan bersihkan sisa racun!';
      }

      if (window.soundEngine) {
        window.soundEngine.playVO(voKey, voFallback);
      }

      if (chosen.actionTarget) {
        this.triggerActionSignaling(chosen.actionTarget);
      }
    };

    const closeModal = () => {
      voteTimer.remove();
      if (window.soundEngine) window.soundEngine.playBeep();
      modalContainer.destroy(true);
      backdrop.destroy();
      if (this.simTimer) this.simTimer.paused = false;
    };

    btnClose.on('pointerdown', closeModal);

    votingOptions.forEach((opt, idx) => {
      const cx = startX + (idx * cardSpacing);

      const card = this.add.rectangle(cx, cardY, cardW, cardH, opt.color, 0.95)
        .setStrokeStyle(3, opt.border)
        .setInteractive({ useHandCursor: true });
      modalContainer.add(card);

      const tagText = this.add.text(cx, cardY - 138, opt.tag, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '19px',
        color: '#fef08a',
        fontStyle: 'bold'
      }).setOrigin(0.5);
      modalContainer.add(tagText);

      // Kartu Visual LKPD Nyata
      if (this.textures.exists(opt.assetKey)) {
        const cardImg = this.add.image(cx, cardY - 45, opt.assetKey).setDisplaySize(130, 130);
        modalContainer.add(cardImg);
      }

      const cardTitle = this.add.text(cx, cardY + 38, opt.title, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '16px',
        color: '#ffffff',
        fontStyle: 'bold'
      }).setOrigin(0.5);
      modalContainer.add(cardTitle);

      const cardDesc = this.add.text(cx, cardY + 70, opt.desc, {
        fontFamily: 'Nunito, sans-serif',
        fontSize: '13px',
        color: '#cbd5e1',
        align: 'center',
        wordWrap: { width: cardW - 30 },
        lineSpacing: 3
      }).setOrigin(0.5);
      modalContainer.add(cardDesc);

      const btnChoose = this.add.rectangle(cx, cardY + 124, cardW - 50, 42, opt.border)
        .setInteractive({ useHandCursor: true });
      const btnChooseText = this.add.text(cx, cardY + 124, '🗳️ SUARA TERBANYAK', {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '15px',
        color: '#ffffff',
        fontStyle: 'bold'
      }).setOrigin(0.5);
      modalContainer.add([btnChoose, btnChooseText]);

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

    // Tombol Lanjutkan di Bawah
    const btnCancel = this.add.rectangle(width / 2, height / 2 + 285, 260, 44, 0x334155)
      .setInteractive({ useHandCursor: true })
      .setStrokeStyle(2, 0x94a3b8);
    const btnCancelText = this.add.text(width / 2, height / 2 + 285, '⏩ LANJUTKAN SIMULASI', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '16px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    modalContainer.add([btnCancel, btnCancelText]);

    btnCancel.on('pointerdown', closeModal);
  }

  // --- 10. MODAL ENSIKLOPEDIA & KAMUS SAWAH DETEKTIF (8 KARTU ILUSTRASI POP-UP) ---
  showKamusModal() {
    const { width, height } = this.scale;

    // 1. Jeda simulasi saat membaca kamus
    if (this.simTimer) this.simTimer.paused = true;
    if (window.soundEngine) window.soundEngine.playChime();

    const kamusBackdrop = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.88)
      .setInteractive()
      .setDepth(250);

    const kamusContainer = this.add.container(0, 0).setDepth(251);

    // Box Utama Modal Kamus
    const boxW = 1240;
    const boxH = 730;
    const modalBox = this.add.rectangle(width / 2, height / 2, boxW, boxH, 0x064e3b, 0.98)
      .setStrokeStyle(4, 0xf59e0b);
    const innerBorder = this.add.rectangle(width / 2, height / 2, boxW - 12, boxH - 12)
      .setStrokeStyle(2, 0xfef08a, 0.4);
    kamusContainer.add([modalBox, innerBorder]);

    // Header Kamus
    const titleText = this.add.text(width / 2, height / 2 - 320, '📖 ENSIKLOPEDIA & KAMUS SAWAH DETEKTIF', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '28px',
      color: '#fef08a',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    const subText = this.add.text(width / 2, height / 2 - 285, 'Kamus sains ekosistem sawah SDN Percobaan 2: Sentuh salah satu kartu untuk membaca penjelasan lengkap!', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '16px',
      color: '#e2e8f0'
    }).setOrigin(0.5);
    kamusContainer.add([titleText, subText]);

    // Tombol Tutup ✕
    const btnClose = this.add.rectangle(width / 2 + boxW / 2 - 38, height / 2 - boxH / 2 + 38, 46, 46, 0xef4444)
      .setInteractive({ useHandCursor: true });
    btnClose.setStrokeStyle(2, 0xffffff);
    const tClose = this.add.text(width / 2 + boxW / 2 - 38, height / 2 - boxH / 2 + 38, '✕', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '26px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    kamusContainer.add([btnClose, tClose]);

    const closeKamus = () => {
      if (window.soundEngine) window.soundEngine.playBeep();
      kamusContainer.destroy(true);
      kamusBackdrop.destroy();
      if (this.simTimer) this.simTimer.paused = false;
    };

    btnClose.on('pointerdown', closeKamus);

    // DATA 8 KARTU KAMUS SAWAH (Piaget Concrete Operational & Mayer Multimedia Principle)
    const kamusData = [
      {
        key: 'kamus_pematang',
        title: 'Pematang Sawah',
        tag: 'HABITAT & JALUR',
        tagColor: 0x059669,
        summary: 'Tanggul tanah pemisah petak sawah',
        desc: 'Pematang sawah adalah tanggul tanah pembatas air antarpetak sawah. Di sini rumput alami tumbuh sebagai sarang serangga menguntungkan dan jalan patroli ular pemangsa tikus.',
        role: 'Peran: Menahan genangan air irigasi dan menjadi koridor jelajah predator alami.'
      },
      {
        key: 'kamus_wereng',
        title: 'Wereng Cokelat',
        tag: 'HAMA PENGHISAP',
        tagColor: 0xd97706,
        summary: 'Serangga perusak batang padi',
        desc: 'Wereng cokelat adalah serangga kecil yang menghisap cairan batang padi hingga tanaman layu mengering cokelat keemasan seperti terbakar (gejala hopperburn).',
        role: 'Peran: Ditekan secara alami oleh predator seperti katak sawah dan laba-laba pemburu.'
      },
      {
        key: 'kamus_irigasi',
        title: 'Saluran Irigasi',
        tag: 'SUMBER AIR',
        tagColor: 0x0284c7,
        summary: 'Sistem pengairan teknis sawah',
        desc: 'Saluran irigasi mengalirkan air dari sungai atau bendungan ke sawah. Air menjaga kelembapan tanah, melarutkan nutrisi pupuk, dan menjadi tempat hidup katak.',
        role: 'Peran: Mencegah tanah sawah retak kering dan menjaga fotosintesis rumpun padi.'
      },
      {
        key: 'kamus_pengurai',
        title: 'Jamur Pengurai',
        tag: 'DEKOMPOSER',
        tagColor: 0x7c3aed,
        summary: 'Mikroba daur ulang nutrisi tanah',
        desc: 'Jamur dan mikroba pengurai bertugas membusukkan bangkai hewan dan jerami kering menjadi zat hara dan humus yang menyuburkan tanah sawah.',
        role: 'Peran: Menutup siklus nutrisi rantai makanan agar energi tidak terbuang sia-sia.'
      },
      {
        key: 'kamus_pemangsa',
        title: 'Predator Alami',
        tag: 'PENJAGA KESEIMBANGAN',
        tagColor: 0x047857,
        summary: 'Ular, katak, & elang pemburu hama',
        desc: 'Predator alami memburu hewan pengganggu tanpa racun sintetis. Ular sawah memangsa tikus, katak memakan serangga, dan elang mengawasi dari udara.',
        role: 'Peran: Menjaga populasi herbivora tetap seimbang tanpa merusak lingkungan.'
      },
      {
        key: 'kamus_hama',
        title: 'Hama Sawah',
        tag: 'KONSUMEN PRIMER',
        tagColor: 0xd97706,
        summary: 'Tikus & serangga pemakan padi',
        desc: 'Hewan pemakan tanaman pangan yang populasinya melonjak tajam jika predator pemburunya hilang akibat perburuan liar atau pencemaran racun kimia.',
        role: 'Peran: Menjadi makanan bagi predator tingkat dua jika jumlahnya terkontrol.'
      },
      {
        key: 'kamus_gulma',
        title: 'Gulma Tanaman',
        tag: 'KOMPETITOR HARA',
        tagColor: 0x4f46e5,
        summary: 'Tumbuhan liar pesaing padi',
        desc: 'Gulma adalah rumput liar yang bersaing dengan padi dalam memperebutkan pupuk tanah, sinar matahari, dan ruang tumbuh di petak sawah.',
        role: 'Peran: Dikendalikan secara biologis atau penyiangan teratur oleh petani.'
      },
      {
        key: 'kamus_limbah',
        title: 'Limbah Jerami',
        tag: 'BAHAN ORGANIK',
        tagColor: 0xb45309,
        summary: 'Sisa panen bernutrisi tinggi',
        desc: 'Batang padi kering pascapanen. Jika dibakar akan mencemari udara, tetapi jika diurai oleh jamur pengurai akan berubah menjadi pupuk kompos alami.',
        role: 'Peran: Bahan baku pupuk organik terbaik untuk mengembalikan kesuburan tanah.'
      }
    ];

    // Grid 4 Kolom x 2 Baris
    const cols = 4;
    const colSpacing = 275;
    const rowSpacing = 215;
    const startGridX = width / 2 - ((cols - 1) * colSpacing) / 2;
    const startGridY = height / 2 - 120;

    kamusData.forEach((item, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const cx = startGridX + col * colSpacing;
      const cy = startGridY + row * rowSpacing;

      const cardW = 255;
      const cardH = 200;

      const cardBg = this.add.rectangle(cx, cy, cardW, cardH, 0x022c22, 0.95)
        .setStrokeStyle(2, 0x10b981)
        .setInteractive({ useHandCursor: true });
      kamusContainer.add(cardBg);

      // Gambar Thumbnail Kartu Kamus
      if (this.textures.exists(item.key)) {
        const thumb = this.add.image(cx, cy - 38, item.key).setDisplaySize(92, 92);
        kamusContainer.add(thumb);
      }

      // Tag Kategori
      const tagBg = this.add.rectangle(cx, cy + 24, cardW - 60, 20, item.tagColor);
      const tagTxt = this.add.text(cx, cy + 24, item.tag, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '11px',
        color: '#ffffff',
        fontStyle: 'bold'
      }).setOrigin(0.5);
      kamusContainer.add([tagBg, tagTxt]);

      // Judul Kartu
      const titleTxt = this.add.text(cx, cy + 48, item.title, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '15px',
        color: '#fef08a',
        fontStyle: 'bold'
      }).setOrigin(0.5);
      kamusContainer.add(titleTxt);

      // Tombol Buka Detail
      const hintTxt = this.add.text(cx, cy + 72, '🔍 Sentuh untuk Baca', {
        fontFamily: 'Nunito, sans-serif',
        fontSize: '12px',
        color: '#93c5fd'
      }).setOrigin(0.5);
      kamusContainer.add(hintTxt);

      // Hover
      cardBg.on('pointerover', () => {
        cardBg.setStrokeStyle(3, 0xf59e0b);
        cardBg.setScale(1.04);
      });
      cardBg.on('pointerout', () => {
        cardBg.setStrokeStyle(2, 0x10b981);
        cardBg.setScale(1.0);
      });

      // Klik: Buka Detail Kamus
      cardBg.on('pointerdown', () => {
        if (window.soundEngine) window.soundEngine.playBeep();
        this.showKamusDetail(item);
      });
    });
  }

  showKamusDetail(item) {
    const { width, height } = this.scale;
    const detailGroup = this.add.container(0, 0).setDepth(260);

    const dimDetail = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.75)
      .setInteractive();
    detailGroup.add(dimDetail);

    const detailW = 860;
    const detailH = 540;
    const box = this.add.rectangle(width / 2, height / 2, detailW, detailH, 0x064e3b, 0.99)
      .setStrokeStyle(4, 0xf59e0b);
    const inner = this.add.rectangle(width / 2, height / 2, detailW - 12, detailH - 12)
      .setStrokeStyle(2, 0xfef08a, 0.5);
    detailGroup.add([box, inner]);

    // Ilustrasi Besar
    if (this.textures.exists(item.key)) {
      const bigImg = this.add.image(width / 2 - 250, height / 2 - 20, item.key).setDisplaySize(260, 260);
      detailGroup.add(bigImg);
    }

    // Teks Informasi di Kanan
    const infoX = width / 2 - 80;

    const tTag = this.add.text(infoX, height / 2 - 200, item.tag, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '15px',
      color: '#34d399',
      fontStyle: 'bold'
    });
    detailGroup.add(tTag);

    const tTitle = this.add.text(infoX, height / 2 - 165, item.title, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '28px',
      color: '#fef08a',
      fontStyle: 'bold'
    });
    detailGroup.add(tTitle);

    const tDesc = this.add.text(infoX, height / 2 - 95, item.desc, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '17px',
      color: '#f8fafc',
      wordWrap: { width: 480 },
      lineSpacing: 6
    });
    detailGroup.add(tDesc);

    const tRole = this.add.text(infoX, height / 2 + 50, item.role, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '16px',
      color: '#a7f3d0',
      fontStyle: 'bold',
      wordWrap: { width: 480 },
      lineSpacing: 5
    });
    detailGroup.add(tRole);

    // Tombol Kembali
    const btnBack = this.add.rectangle(width / 2, height / 2 + 215, 240, 46, 0x10b981)
      .setInteractive({ useHandCursor: true });
    btnBack.setStrokeStyle(2, 0xfef08a);
    const btnBackText = this.add.text(width / 2, height / 2 + 215, '🔙 KEMBALI KE DAFTAR', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '16px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    detailGroup.add([btnBack, btnBackText]);

    const closeDetail = () => {
      if (window.soundEngine) window.soundEngine.playBeep();
      detailGroup.destroy(true);
    };

    dimDetail.on('pointerdown', closeDetail);
    btnBack.on('pointerdown', closeDetail);
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
      
      let hint = 'Ekosistem belum seimbang! Periksa daftar tugas detektif di kanan atas ya!';
      if (this.activeMission && this.activeMission.targets) {
        const tg = this.activeMission.targets;
        if (tg.q1 && !this.isTargetMet(tg.q1)) hint = `Belum selesai: ${tg.q1.text}! Periksa tombol tindakan di bawah!`;
        else if (tg.q2 && !this.isTargetMet(tg.q2)) hint = `Belum selesai: ${tg.q2.text}! Lanjutkan usaha kelompokmu!`;
        else if (tg.q3 && !this.isTargetMet(tg.q3)) hint = `Belum selesai: ${tg.q3.text}! Ayo sedikit lagi!`;
      } else if (this.legacyMissionId === 1 && this.pop.ular < 20) {
        hint = `Ular sawah masih kurang! Lepaskan minimal ${20 - this.pop.ular} ekor ular lagi agar memangsa tikus!`;
      } else if (this.legacyMissionId === 1 && this.pop.tikus > 30) {
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

  /**
   * Pembersihan Siklus Hidup Scene (Lifecycle Hook)
   * Menghentikan semua timer, mematikan tweens, dan menghapus listener untuk mencegah memory leak.
   */
  shutdown() {
    // 1. Hentikan simTimer
    if (this.simTimer) {
      this.simTimer.remove(false);
      this.simTimer = null;
    }

    // 2. Matikan seluruh active tweens
    if (this.tweens) {
      this.tweens.killAll();
    }

    // 3. Bersihkan time events tambahan
    if (this.time) {
      this.time.removeAllEvents();
    }

    // 4. Bersihkan listener input
    if (this.input) {
      this.input.removeAllListeners();
    }

    // 5. Bersihkan sprite pool dengan aman
    if (this.organismGroup) {
      try {
        if (this.organismGroup.children) {
          this.organismGroup.clear(true, true);
        }
      } catch (err) {
        // Abaikan jika group sudah dibersihkan otomatis oleh DisplayList Phaser
      }
      this.organismGroup = null;
    }
    this.padiPool = [];
    this.tikusPool = [];
    this.katakPool = [];
    this.ularPool = [];
    this.elangPool = [];
    this.jamurPool = [];
    this.padiSprites = [];
    this.tikusSprites = [];
    this.katakSprites = [];
    this.ularSprites = [];
    this.elangSprites = [];
    this.jamurSprites = [];
  }
}

window.SimulationScene = SimulationScene;

