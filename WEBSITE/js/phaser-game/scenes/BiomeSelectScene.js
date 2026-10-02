/**
 * ECO-EXPLORER (PHASER 3) - BIOME SELECT SCENE (PETA EKOSISTEM NUSANTARA)
 * Layar pemilihan 4 Ekosistem: Sawah, Hutan Tropis, Sungai, dan Laut.
 * Terintegrasi dengan ProgressManager untuk lock/unlock dan bintang.
 * Ramah jari anak kelas 5 SD pada layar IFP (Anti-fat-finger, kontras tinggi).
 */

class BiomeSelectScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BiomeSelectScene' });
  }

  create() {
    const { width, height } = this.scale;
    const activeTeam = this.registry.get('activeTeam') || { name: 'TIM DETEKTIF', color: 0x10b981, badge: 'badge_elang', role: 'Penjaga Keseimbangan' };

    // 1. Background Sawah / Alam Dimmer Modern 2D Vector
    const bg = this.add.image(width / 2, height / 2, 'bg_sawah');
    bg.setDisplaySize(width, height);
    this.add.rectangle(width / 2, height / 2, width, height, 0x021a14, 0.75);

    // Partikel Spora Mengambang Ceria
    this.createFloatingSporeFX(width, height);

    // 2. Top Header Status Tim Aktif
    const headerW = 1620;
    const headerH = 96;
    const headerY = 64;

    const gHead = this.add.graphics();
    // Drop Shadow
    gHead.fillStyle(0x000000, 0.45);
    gHead.fillRoundedRect(width / 2 - headerW / 2 + 4, headerY - headerH / 2 + 6, headerW, headerH, 18);

    // Bingkai Kayu Solid & Panel Zamrud
    gHead.fillStyle(0x1e1b18, 1);
    gHead.fillRoundedRect(width / 2 - headerW / 2, headerY - headerH / 2, headerW, headerH, 18);
    gHead.fillStyle(0x064e3b, 1);
    gHead.fillRoundedRect(width / 2 - headerW / 2 + 5, headerY - headerH / 2 + 5, headerW - 10, headerH - 10, 14);
    gHead.lineStyle(3, 0xfbbf24, 1);
    gHead.strokeRoundedRect(width / 2 - headerW / 2 + 5, headerY - headerH / 2 + 5, headerW - 10, headerH - 10, 14);

    // Medallion Lencana Tim (Dengan Secret Trigger Mode Penguji: Ketuk 5x)
    const badgeRim = this.add.graphics();
    badgeRim.fillStyle(0x1c1917, 1);
    badgeRim.fillCircle(195, headerY, 36);
    badgeRim.lineStyle(2.5, 0xfbbf24, 1);
    badgeRim.strokeCircle(195, headerY, 36);
    const badgeImg = this.add.image(195, headerY, activeTeam.badge || 'badge_elang')
      .setDisplaySize(64, 64)
      .setInteractive({ useHandCursor: true });

    let secretTapCount = 0;
    let secretTapTimer = null;
    badgeImg.on('pointerdown', () => {
      badgeImg.setScale(0.88);
      this.time.delayedCall(100, () => badgeImg.setScale(1.0));
      secretTapCount++;
      if (secretTapTimer) secretTapTimer.remove(false);
      secretTapTimer = this.time.delayedCall(3000, () => {
        secretTapCount = 0;
      });

      if (secretTapCount >= 5) {
        secretTapCount = 0;
        if (window.soundEngine) window.soundEngine.playSuccess();
        if (window.progressManager) window.progressManager.unlockAllForExaminer();
        this.showExaminerNotice(width, height);
      }
    });

    // Total Stars Pill
    const totalStars = window.progressManager ? window.progressManager.getTotalStars() : 0;
    const starPillText = `\u2B50 ${totalStars}/24 Bintang`;

    this.add.text(255, headerY - 18, `PETA EKOSISTEM NUSANTARA - GILIRAN: ${activeTeam.name}`, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '24px',
      color: '#fef08a',
      fontStyle: 'bold',
      shadow: { offsetY: 2, color: '#1c1917', blur: 3, fill: true }
    });

    this.add.text(255, headerY + 16, `Pilih ekosistem terbuka untuk diselidiki! ${starPillText}`, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '19px',
      color: '#a7f3d0',
      fontStyle: 'bold'
    });

    // Tombol Suara Panduan Gita
    this.createButton3D(width - 520, headerY, 54, 52, '\uD83D\uDD0A', 0x065f46, 0x10b981, () => {
      if (window.soundEngine) {
        window.soundEngine.playBeep();
        window.soundEngine.speakText('Pilih ekosistem yang sudah terbuka untuk diselidiki. Selesaikan ekosistem secara berurutan!');
      }
    });

    // Tombol Ganti Tim
    this.createButton3D(width - 390, headerY, 180, 52, '\uD83D\uDD04 Ganti Tim', 0x0f172a, 0x334155, () => {
      if (window.soundEngine) {
        window.soundEngine.playBeep();
        window.soundEngine.stopVoice();
      }
      this.time.delayedCall(120, () => {
        this.scene.start('TeamSelectScene');
      });
    });

    // Tombol Reset Kelas (untuk Guru - Bebas window.confirm)
    this.createButton3D(width - 180, headerY, 160, 52, '\uD83D\uDD04 Reset Kelas', 0x475569, 0x64748b, () => {
      if (window.soundEngine) window.soundEngine.playBeep();
      this.showConfirmModal(
        '⚠️ KONFIRMASI RESET KELAS',
        'Apakah Ibu/Bapak Guru yakin ingin mereset seluruh kemajuan 4 bioma ke kondisi awal?',
        () => {
          if (window.progressManager) {
            window.progressManager.resetProgress();
          }
          this.scene.restart();
        }
      );
    });

    // 3. Konfigurasi 4 Ekosistem Nusantara (dari ECOSYSTEMS_DATA, urutan tetap)
    const ecoOrder = ['sawah', 'hutan', 'sungai', 'laut'];
    const biomeCards = [
      { id: 'sawah', icon: '\uD83C\uDF3E', tagline: 'Lahan Pangan & Keseimbangan Petani' },
      { id: 'hutan', icon: '\uD83C\uDF32', tagline: 'Rimba Hujan & Paru-Paru Nusantara' },
      { id: 'sungai', icon: '\uD83C\uDF0A', tagline: 'Sungai Air Tawar & Sumber Kehidupan' },
      { id: 'laut', icon: '\uD83D\uDC1F', tagline: 'Samudra Tropis & Terumbu Karang' }
    ];

    // Grid 2x2 Simetris Lapang & Taktil untuk Layar Sentuh IFP
    const cardW = 790;
    const cardH = 360;
    const positions = [
      { x: 525, y: 325 },
      { x: 1395, y: 325 },
      { x: 525, y: 720 },
      { x: 1395, y: 720 }
    ];

    biomeCards.forEach((bc, idx) => {
      const ecoData = window.ECOSYSTEMS_DATA ? window.ECOSYSTEMS_DATA[bc.id] : null;
      if (!ecoData) return;

      const isUnlocked = window.progressManager ? window.progressManager.isEcosystemUnlocked(bc.id) : (bc.id === 'sawah');
      const stars = window.progressManager ? window.progressManager.getEcosystemStars(bc.id) : 0;

      const pos = positions[idx];
      this.createBiomeCard(pos.x, pos.y, cardW, cardH, {
        id: bc.id,
        name: `${bc.icon} ${ecoData.name}`,
        tagline: bc.tagline,
        desc: ecoData.desc,
        badge: ecoData.badge,
        accentColor: ecoData.accentColor,
        accentBg: ecoData.ambientColor,
        bgPreview: ecoData.bg,
        isUnlocked: isUnlocked,
        stars: stars,
        order: ecoData.order
      });
    });

    // Sub-panduan bawah layar
    this.add.text(width / 2, height - 32, '\uD83D\uDCA1 Selesaikan ekosistem secara berurutan: Sawah \u27A1 Hutan Tropis \u27A1 Sungai \u27A1 Laut', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '20px',
      color: '#fef08a',
      fontStyle: 'bold',
      shadow: { offsetY: 2, color: '#000000', blur: 3, fill: true }
    }).setOrigin(0.5);
  }

  // --- KARTU BIOME INTERAKTIF IFP ---
  createBiomeCard(x, y, w, h, biome) {
    const container = this.add.container(x, y);

    // Drop Shadow
    const shadow = this.add.graphics();
    shadow.fillStyle(0x000000, 0.45);
    shadow.fillRoundedRect(-w / 2 + 5, -h / 2 + 8, w, h, 22);

    // Background Frame Luar
    const frame = this.add.graphics();
    frame.fillStyle(0x0a111e, 1);
    frame.fillRoundedRect(-w / 2, -h / 2, w, h, 22);

    // Background Dalam Kartu dengan Warna Aksen
    if (biome.isUnlocked) {
      frame.fillStyle(biome.accentBg, 0.95);
    } else {
      frame.fillStyle(0x1e293b, 0.85);
    }
    frame.fillRoundedRect(-w / 2 + 4, -h / 2 + 4, w - 8, h - 8, 18);

    if (biome.isUnlocked) {
      frame.lineStyle(3.5, biome.accentColor, 1);
    } else {
      frame.lineStyle(3, 0x475569, 0.7);
    }
    frame.strokeRoundedRect(-w / 2 + 4, -h / 2 + 4, w - 8, h - 8, 18);

    // Medallion Lencana Biome (Kiri Atas)
    const medalX = -w / 2 + 85;
    const medalY = -h / 2 + 85;

    const halo = this.add.graphics();
    halo.fillStyle(biome.isUnlocked ? biome.accentColor : 0x475569, 0.35);
    halo.fillCircle(medalX, medalY, 62);

    const medalRim = this.add.graphics();
    medalRim.fillStyle(0x111827, 1);
    medalRim.fillCircle(medalX, medalY, 52);
    medalRim.lineStyle(3, biome.isUnlocked ? 0xfbbf24 : 0x475569, 1);
    medalRim.strokeCircle(medalX, medalY, 52);

    const badgeImg = this.add.image(medalX, medalY, biome.badge).setDisplaySize(100, 100);
    if (!biome.isUnlocked) {
      badgeImg.setTint(0x444444);
      badgeImg.setAlpha(0.5);
    }

    // Judul & Tagline Ekosistem
    const titleTxt = this.add.text(-w / 2 + 160, -h / 2 + 42, biome.name, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '28px',
      color: biome.isUnlocked ? '#ffffff' : '#94a3b8',
      fontStyle: 'bold',
      shadow: { offsetY: 2, color: '#000000', blur: 3, fill: true }
    });

    const tagTxt = this.add.text(-w / 2 + 162, -h / 2 + 82, biome.tagline, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '20px',
      color: biome.isUnlocked ? '#fef08a' : '#64748b',
      fontStyle: 'bold'
    });

    // Tablet Deskripsi Kasus
    const descBox = this.add.graphics();
    descBox.fillStyle(0x030712, 0.55);
    descBox.fillRoundedRect(-w / 2 + 25, -h / 2 + 125, w - 50, 90, 14);
    descBox.lineStyle(1.5, biome.isUnlocked ? 0x334155 : 0x1e293b, 1);
    descBox.strokeRoundedRect(-w / 2 + 25, -h / 2 + 125, w - 50, 90, 14);

    const descTxt = this.add.text(-w / 2 + 45, -h / 2 + 138, biome.desc, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '17px',
      color: biome.isUnlocked ? '#e2e8f0' : '#64748b',
      wordWrap: { width: w - 90 },
      lineSpacing: 4
    });

    // Star Rating (Kanan Atas)
    const starText = biome.isUnlocked ? `\u2B50 ${biome.stars}/6 Bintang` : '\uD83D\uDD12 TERKUNCI';
    const starColor = biome.isUnlocked ? '#a7f3d0' : '#94a3b8';
    const casesTxt = this.add.text(w / 2 - 32, -h / 2 + 45, starText, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '20px',
      color: starColor,
      fontStyle: 'bold'
    }).setOrigin(1, 0);

    // Tombol Aksi Bawah
    const btnW = w - 50;
    const btnH = 58;
    const btnY = h / 2 - 48;

    const btnG = this.add.graphics();
    btnG.fillStyle(0x000000, 0.4);
    btnG.fillRoundedRect(-btnW / 2 + 3, btnY - btnH / 2 + 4, btnW, btnH, 14);

    const btnFace = this.add.graphics();
    const btnTxt = this.add.text(0, btnY, '', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '22px',
      color: '#ffffff',
      fontStyle: 'bold',
      shadow: { offsetY: 2, color: '#000000', blur: 3, fill: true }
    }).setOrigin(0.5);

    if (biome.isUnlocked) {
      btnFace.fillStyle(biome.accentColor, 1);
      btnFace.fillRoundedRect(-btnW / 2, btnY - btnH / 2, btnW, btnH, 14);
      btnFace.lineStyle(2, 0xfef08a, 1);
      btnFace.strokeRoundedRect(-btnW / 2, btnY - btnH / 2, btnW, btnH, 14);
      btnTxt.setText(`SELIDIKI EKOSISTEM \uD83D\uDD0D`);
    } else {
      btnFace.fillStyle(0x334155, 0.7);
      btnFace.fillRoundedRect(-btnW / 2, btnY - btnH / 2, btnW, btnH, 14);
      btnFace.lineStyle(2, 0x475569, 0.5);
      btnFace.strokeRoundedRect(-btnW / 2, btnY - btnH / 2, btnW, btnH, 14);
      btnTxt.setText('\uD83D\uDD12 Tuntaskan ekosistem sebelumnya untuk membuka');
      btnTxt.setFontSize('18px');
      btnTxt.setColor('#94a3b8');
    }

    // Lock overlay for locked biomes
    let lockOverlay = null;
    if (!biome.isUnlocked) {
      lockOverlay = this.add.graphics();
      lockOverlay.fillStyle(0x0f172a, 0.45);
      lockOverlay.fillRoundedRect(-w / 2 + 4, -h / 2 + 4, w - 8, h - 8, 18);

      // Big lock icon center
      const lockIcon = this.add.text(0, -20, '\uD83D\uDD12', {
        fontSize: '52px'
      }).setOrigin(0.5).setAlpha(0.7);
      container.add(lockIcon);
    }

    // Hit Area Interaktif Seluruh Kartu
    const hitArea = this.add.rectangle(0, 0, w, h, 0x000000, 0.001)
      .setInteractive({ useHandCursor: biome.isUnlocked });

    const allElements = [shadow, frame, halo, medalRim, badgeImg, titleTxt, tagTxt, casesTxt, descBox, descTxt, btnG, btnFace, btnTxt];
    if (lockOverlay) allElements.push(lockOverlay);
    allElements.push(hitArea);
    container.add(allElements);

    if (biome.isUnlocked) {
      hitArea.on('pointerdown', () => {
        btnFace.y = 3;
        btnTxt.y = btnY + 3;
        if (window.soundEngine) {
          window.soundEngine.playBeep();
        }
      });

      hitArea.on('pointerup', () => {
        btnFace.y = 0;
        btnTxt.y = btnY;
        this.selectBiome(biome);
      });

      hitArea.on('pointerover', () => {
        this.tweens.add({
          targets: container,
          scaleX: 1.025,
          scaleY: 1.025,
          duration: 150,
          ease: 'Cubic.easeOut'
        });
      });

      hitArea.on('pointerout', () => {
        btnFace.y = 0;
        btnTxt.y = btnY;
        this.tweens.add({
          targets: container,
          scaleX: 1.0,
          scaleY: 1.0,
          duration: 150,
          ease: 'Cubic.easeOut'
        });
      });
    } else {
      // Locked biome: play warning sound on tap
      hitArea.on('pointerdown', () => {
        if (window.soundEngine) {
          window.soundEngine.playWarning ? window.soundEngine.playWarning() : window.soundEngine.playBeep();
          window.soundEngine.speakText('Ekosistem ini masih terkunci. Selesaikan ekosistem sebelumnya terlebih dahulu!');
        }
        // Shake animation
        this.tweens.add({
          targets: container,
          x: x + 8,
          duration: 50,
          yoyo: true,
          repeat: 3,
          onComplete: () => { container.x = x; }
        });
      });
    }
  }

  // --- PILIH BIOME & PINDAH KE MENU MISI ---
  selectBiome(biome) {
    this.registry.set('activeEcosystem', biome.id);

    if (window.soundEngine) {
      window.soundEngine.playChime();
      const ecoData = window.ECOSYSTEMS_DATA ? window.ECOSYSTEMS_DATA[biome.id] : null;
      const name = ecoData ? ecoData.name : biome.name;
      window.soundEngine.speakText(`Kalian memilih ${name}. Bersiaplah menyelidiki 2 misi penyelamatan!`);
    }

    this.time.delayedCall(300, () => {
      this.scene.start('MissionMenuScene');
    });
  }

  // --- PARTIKEL KUNANG-KUNANG / SPORA EMAS ---
  createFloatingSporeFX(width, height) {
    const fxGroup = this.add.group();
    for (let i = 0; i < 28; i++) {
      const rx = Phaser.Math.Between(40, width - 40);
      const ry = Phaser.Math.Between(40, height - 40);
      const rRadius = Phaser.Math.FloatBetween(2, 4.5);
      const rAlpha = Phaser.Math.FloatBetween(0.25, 0.65);
      const spore = this.add.circle(rx, ry, rRadius, 0xfde047, rAlpha);
      fxGroup.add(spore);

      this.tweens.add({
        targets: spore,
        x: rx + Phaser.Math.Between(-60, 60),
        y: ry + Phaser.Math.Between(-80, 80),
        alpha: { from: rAlpha, to: Phaser.Math.FloatBetween(0.1, 0.8) },
        scale: { from: 0.8, to: 1.4 },
        duration: Phaser.Math.Between(3000, 6000),
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }
  }

  // --- HELPER TOMBOL 3D ---
  createButton3D(x, y, w, h, label, bgDark, bgTop, callback) {
    const container = this.add.container(x, y);
    const gShadow = this.add.graphics();
    gShadow.fillStyle(0x000000, 0.4);
    gShadow.fillRoundedRect(-w / 2, -h / 2 + 4, w, h, 14);

    const gFace = this.add.graphics();
    gFace.fillStyle(bgTop, 1);
    gFace.fillRoundedRect(-w / 2, -h / 2, w, h, 14);
    gFace.lineStyle(2, 0xfef08a, 1);
    gFace.strokeRoundedRect(-w / 2, -h / 2, w, h, 14);

    const txt = this.add.text(0, 0, label, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: label.length > 3 ? '19px' : '24px',
      color: '#ffffff',
      fontStyle: 'bold',
      shadow: { offsetY: 2, color: '#000000', blur: 2, fill: true }
    }).setOrigin(0.5);

    const hit = this.add.rectangle(0, 0, w, h, 0x000000, 0.001).setInteractive({ useHandCursor: true });
    container.add([gShadow, gFace, txt, hit]);

    hit.on('pointerdown', () => {
      gFace.y = 3;
      txt.y = 3;
    });
    hit.on('pointerup', () => {
      gFace.y = 0;
      txt.y = 0;
      callback();
    });
    return container;
  }

  showExaminerNotice(width, height) {
    const bannerContainer = this.add.container(width / 2, 140).setDepth(300);
    const bannerBg = this.add.rectangle(0, 0, 940, 64, 0x064e3b, 0.98);
    bannerBg.setStrokeStyle(3, 0xfbbf24);
    const bannerTxt = this.add.text(0, 0, '🎓 MODE PENGUJI AKTIF: 4 BIOMA & 8 MISI TERBUKA (24 BINTANG)!', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '22px',
      color: '#fef08a',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    bannerContainer.add([bannerBg, bannerTxt]);

    this.tweens.add({
      targets: bannerContainer,
      scaleX: { from: 0.8, to: 1.05 },
      scaleY: { from: 0.8, to: 1.05 },
      duration: 350,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        this.time.delayedCall(600, () => {
          this.scene.restart();
        });
      }
    });
  }

  showConfirmModal(title, message, onYes) {
    const { width, height } = this.scale;
    const modalContainer = this.add.container(0, 0).setDepth(400);

    // Dimmer Backdrop yang memblokir klik di bawahnya
    const backdrop = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.82)
      .setInteractive();
    modalContainer.add(backdrop);

    // Box Utama Modal (Emerald & Golden Amber Border)
    const boxW = 860;
    const boxH = 340;
    const box = this.add.rectangle(width / 2, height / 2, boxW, boxH, 0x064e3b, 0.98);
    box.setStrokeStyle(4, 0xf59e0b);
    const innerBorder = this.add.rectangle(width / 2, height / 2, boxW - 12, boxH - 12);
    innerBorder.setStrokeStyle(1.5, 0xfef08a, 0.4);
    modalContainer.add([box, innerBorder]);

    // Judul Konfirmasi
    const titleText = this.add.text(width / 2, height / 2 - 100, title, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '28px',
      color: '#fef08a',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    modalContainer.add(titleText);

    // Deskripsi Pesan
    const descText = this.add.text(width / 2, height / 2 - 35, message, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '19px',
      color: '#e2e8f0',
      fontStyle: 'bold',
      align: 'center',
      wordWrap: { width: boxW - 80 },
      lineSpacing: 6
    }).setOrigin(0.5);
    modalContainer.add(descText);

    // Tombol Batal (Hijau Zamrud)
    const btnCancel = this.add.rectangle(width / 2 - 170, height / 2 + 75, 260, 60, 0x047857)
      .setInteractive({ useHandCursor: true });
    btnCancel.setStrokeStyle(2.5, 0x34d399);
    const tCancel = this.add.text(width / 2 - 170, height / 2 + 75, '❌ BATAL', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '20px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    modalContainer.add([btnCancel, tCancel]);

    btnCancel.on('pointerdown', () => {
      btnCancel.setScale(0.94);
      if (window.soundEngine) window.soundEngine.playBeep();
      this.time.delayedCall(120, () => {
        modalContainer.destroy();
      });
    });

    // Tombol Konfirmasi Ya (Merah Bahaya)
    const btnConfirm = this.add.rectangle(width / 2 + 170, height / 2 + 75, 260, 60, 0xdc2626)
      .setInteractive({ useHandCursor: true });
    btnConfirm.setStrokeStyle(2.5, 0xfca5a5);
    const tConfirm = this.add.text(width / 2 + 170, height / 2 + 75, '✅ YA, RESET KELAS', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '20px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    modalContainer.add([btnConfirm, tConfirm]);

    btnConfirm.on('pointerdown', () => {
      btnConfirm.setScale(0.94);
      if (window.soundEngine) window.soundEngine.playWarning();
      this.time.delayedCall(150, () => {
        modalContainer.destroy();
        if (onYes) onYes();
      });
    });
  }
}

window.BiomeSelectScene = BiomeSelectScene;
