/**
 * ECO-EXPLORER (PHASER 3) - BIOME SELECT SCENE
 * "Full-Screen Stage Showcase" (Character/Stage Select Slider Arcade Style)
 * - Latar Belakang Panorama 1080p Berganti Dinamis (Crossfade Halus)
 * - Plakat Pahlawan Panggung Tengah (Hero Stage Plaque) yang Mewah & Megah
 * - Preview 2 Misi Krisis C2 (Faktor Alam vs Manusia) & Strip Rantai Makanan Bioma
 * - Navigasi Hibrida: Tombol Panah Raksasa ◀ ▶, Touch Swipe Gesture IFP, & 4 Dock Mini Cards
 * - Terintegrasi Penuh dengan ProgressManager, Mode Penguji 5-Tap, dan Audio Gita
 */

class BiomeSelectScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BiomeSelectScene' });
  }

  init() {
    // Ingat posisi bioma terakhir yang dipilih pemain (default 0: sawah)
    this.currentIndex = this.registry.get('selectedBiomeIndex') || 0;

    // Master Biome Configuration & Strip Organisme Kunci
    this.biomes = [
      {
        id: 'sawah',
        icon: '🌾',
        name: 'Ekosistem Sawah',
        shortName: 'Sawah',
        tagline: 'Lahan Pangan & Keseimbangan Petani',
        badge: 'badge_sawah',
        bg: 'bg_sawah',
        ambientColor: 0x064e3b,
        accentColor: 0x10b981,
        prevId: null,
        organisms: [
          { key: 'padi_subur', label: 'Padi' },
          { key: 'tikus', label: 'Tikus' },
          { key: 'katak', label: 'Katak' },
          { key: 'ular', label: 'Ular' },
          { key: 'elang', label: 'Elang' },
          { key: 'jamur', label: 'Jamur' }
        ]
      },
      {
        id: 'hutan',
        icon: '🌲',
        name: 'Ekosistem Hutan Tropis',
        shortName: 'Hutan Tropis',
        tagline: 'Rimba Hujan & Paru-Paru Nusantara',
        badge: 'badge_hutan',
        bg: 'bg_hutan',
        ambientColor: 0x14532d,
        accentColor: 0x16a34a,
        prevId: 'sawah',
        organisms: [
          { key: 'pohon_hutan', label: 'Pohon Rimba' },
          { key: 'rusa', label: 'Rusa' },
          { key: 'harimau', label: 'Harimau' },
          { key: 'jamur_hutan', label: 'Jamur Rimba' }
        ]
      },
      {
        id: 'sungai',
        icon: '🏞️',
        name: 'Ekosistem Sungai Air Tawar',
        shortName: 'Sungai Air Tawar',
        tagline: 'Sungai Air Tawar & Sumber Kehidupan',
        badge: 'badge_danau',
        bg: 'bg_danau',
        ambientColor: 0x0c4a6e,
        accentColor: 0x0284c7,
        prevId: 'hutan',
        organisms: [
          { key: 'teratai', label: 'Teratai' },
          { key: 'keong', label: 'Keong Air' },
          { key: 'ikan_gabus', label: 'Ikan Gabus' },
          { key: 'bangau', label: 'Burung Bangau' }
        ]
      },
      {
        id: 'laut',
        icon: '🌊',
        name: 'Ekosistem Laut Terumbu Karang',
        shortName: 'Laut Karang',
        tagline: 'Samudra Tropis & Terumbu Karang',
        badge: 'badge_laut',
        bg: 'bg_laut',
        ambientColor: 0x1e3a8a,
        accentColor: 0x3b82f6,
        prevId: 'sungai',
        organisms: [
          { key: 'karang', label: 'Terumbu Karang' },
          { key: 'ikan_kecil', label: 'Ikan Karang' },
          { key: 'penyu', label: 'Penyu Hijau' },
          { key: 'hiu', label: 'Hiu Samudra' }
        ]
      }
    ];
  }

  create() {
    const { width, height } = this.scale;
    const activeTeam = this.registry.get('activeTeam') || { name: 'TIM DETEKTIF', color: 0x10b981, badge: 'badge_elang', role: 'Penjaga Keseimbangan' };

    // 1. Dual-Layer Background untuk Transisi Crossfade yang Halus
    const initBiome = this.biomes[this.currentIndex];
    this.bgBottom = this.add.image(width / 2, height / 2, initBiome.bg || 'bg_sawah').setDisplaySize(width, height);
    this.bgTop = this.add.image(width / 2, height / 2, initBiome.bg || 'bg_sawah').setDisplaySize(width, height).setAlpha(0);

    // Lapisan Dimmer Atmosferik
    this.bgDimmer = this.add.rectangle(width / 2, height / 2, width, height, 0x021a14, 0.72);

    // Partikel Spora Mengambang Ceria
    this.createFloatingSporeFX(width, height);

    // 2. Top Header Status Tim Aktif (Mempertahankan Penataan Bebas Tabrakan)
    this.createTopHeader(width, activeTeam);

    // 3. Kontainer Panggung Utama (Hero Stage Plaque) di Tengah Layar
    this.stageContainer = this.add.container(width / 2, 450);

    // 4. Tombol Panah Navigasi Layar Sentuh IFP (◀ dan ▶)
    this.createNavArrows(width);

    // 5. Bilah Dock Thumbnail Bioma di Bawah Layar
    this.createBottomDock(width);

    // 6. Sub-Panduan Bawah Layar Sentuh IFP
    this.add.text(width / 2, height - 28, '💡 Sentuh panah ◀ ▶, geser layar (swipe), atau ketuk kartu di bawah untuk memilih ekosistem', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '24px',
      color: '#fef08a',
      fontStyle: 'bold',
      shadow: { offsetY: 2, color: '#000000', blur: 3, fill: true }
    }).setOrigin(0.5);

    // 7. Input Keyboard Panah Kiri / Kanan
    if (this.input.keyboard) {
      this.input.keyboard.on('keydown-LEFT', () => this.navigateBiome(-1));
      this.input.keyboard.on('keydown-RIGHT', () => this.navigateBiome(1));
    }

    // 8. Gesture Swipe Sentuh IFP
    let touchStartX = 0;
    let touchStartY = 0;
    this.input.on('pointerdown', (pointer) => {
      touchStartX = pointer.x;
      touchStartY = pointer.y;
    });

    this.input.on('pointerup', (pointer) => {
      const deltaX = pointer.x - touchStartX;
      const deltaY = pointer.y - touchStartY;
      // Deteksi geser horizontal dominan minimal 60 piksel
      if (Math.abs(deltaX) > 60 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
        if (deltaX < 0) {
          this.navigateBiome(1); // Swipe kiri -> Bioma berikutnya
        } else {
          this.navigateBiome(-1); // Swipe kanan -> Bioma sebelumnya
        }
      }
    });

    // Render tampilan bioma awal
    this.updateBiomeView(false);
  }

  /**
   * Header Status Tim & Navigasi Utama (Bebas Tabrakan & Overflow)
   */
  createTopHeader(width, activeTeam) {
    const headerW = 1680;
    const headerH = 96;
    const headerY = 64;

    const headerLeft = width / 2 - headerW / 2;
    const headerRight = width / 2 + headerW / 2;

    const gHead = this.add.graphics();
    gHead.fillStyle(0x000000, 0.45);
    gHead.fillRoundedRect(headerLeft + 4, headerY - headerH / 2 + 6, headerW, headerH, 18);

    gHead.fillStyle(0x1e1b18, 1);
    gHead.fillRoundedRect(headerLeft, headerY - headerH / 2, headerW, headerH, 18);
    gHead.fillStyle(0x064e3b, 1);
    gHead.fillRoundedRect(headerLeft + 5, headerY - headerH / 2 + 5, headerW - 10, headerH - 10, 14);
    gHead.lineStyle(3, 0xfbbf24, 1);
    gHead.strokeRoundedRect(headerLeft + 5, headerY - headerH / 2 + 5, headerW - 10, headerH - 10, 14);

    // Medallion Lencana Tim (Dengan Secret Trigger Mode Penguji: Ketuk 5x)
    const badgeX = headerLeft + 52;
    const badgeRim = this.add.graphics();
    badgeRim.fillStyle(0x1c1917, 1);
    badgeRim.fillCircle(badgeX, headerY, 36);
    badgeRim.lineStyle(2.5, 0xfbbf24, 1);
    badgeRim.strokeCircle(badgeX, headerY, 36);

    const badgeImg = this.add.image(badgeX, headerY, activeTeam.badge || 'badge_elang')
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
        this.showExaminerNotice(width, this.scale.height);
      }
    });

    const totalStars = window.progressManager ? window.progressManager.getTotalStars() : 0;
    const starPillText = `\u2B50 ${totalStars}/24 Bintang`;

    const titleX = badgeX + 54;
    this.add.text(titleX, headerY - 18, `PETA EKOSISTEM NUSANTARA - GILIRAN: ${activeTeam.name}`, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '28px',
      color: '#fef08a',
      fontStyle: 'bold',
      shadow: { offsetY: 2, color: '#1c1917', blur: 3, fill: true }
    });

    this.add.text(titleX, headerY + 16, `Pilih panggung ekosistem untuk diselidiki! ${starPillText}`, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '24px',
      color: '#a7f3d0',
      fontStyle: 'bold'
    });

    // Kontrol Kanan (Anchor Presisi Bebas Overflow)
    const innerRight = headerRight - 28;
    const btnGap = 16;
    const btnH = 50;

    // 1. Tombol Reset Kelas (Paling Kanan)
    const wReset = 155;
    const xReset = innerRight - wReset / 2;
    this.createButton3D(xReset, headerY, wReset, btnH, '⚙️ Reset Kelas', 0x475569, 0x64748b, () => {
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

    // 2. Tombol Ganti Tim (Tengah)
    const wTeam = 155;
    const xTeam = (xReset - wReset / 2) - btnGap - wTeam / 2;
    this.createButton3D(xTeam, headerY, wTeam, btnH, '👥 Ganti Tim', 0x0f172a, 0x334155, () => {
      if (window.soundEngine) {
        window.soundEngine.playBeep();
        window.soundEngine.stopVoice();
      }
      this.time.delayedCall(120, () => {
        this.scene.start('TeamSelectScene');
      });
    });

    // 3. Tombol Suara Panduan Gita (Kiri Kontrol)
    const wAudio = 52;
    const xAudio = (xTeam - wTeam / 2) - btnGap - wAudio / 2;
    this.createButton3D(xAudio, headerY, wAudio, btnH, '\uD83D\uDD0A', 0x065f46, 0x10b981, () => {
      if (window.soundEngine) {
        window.soundEngine.playBeep();
        this.playGitaBiomeIntro();
      }
    });
  }

  /**
   * Tombol Panah Navigasi Layar Sentuh IFP (◀ dan ▶)
   */
  createNavArrows(width) {
    const arrowY = 450;
    const arrowW = 80;
    const arrowH = 110;

    // Tombol Panah Kiri
    this.btnPrev = this.createButton3D(100, arrowY, arrowW, arrowH, '◀', 0x0f172a, 0x1e293b, () => {
      this.navigateBiome(-1);
    });

    // Tombol Panah Kanan
    this.btnNext = this.createButton3D(width - 100, arrowY, arrowW, arrowH, '▶', 0x0f172a, 0x1e293b, () => {
      this.navigateBiome(1);
    });
  }

  /**
   * Navigasi Bioma (Geser Indeks)
   */
  navigateBiome(dir) {
    const newIndex = (this.currentIndex + dir + this.biomes.length) % this.biomes.length;
    this.currentIndex = newIndex;
    this.registry.set('selectedBiomeIndex', this.currentIndex);

    if (window.soundEngine) {
      window.soundEngine.playBeep();
    }

    this.updateBiomeView(true);
  }

  /**
   * Perbarui Tampilan Panggung & Dock Sesuai Bioma Aktif
   */
  updateBiomeView(animate = true) {
    const currentBiome = this.biomes[this.currentIndex];
    const ecoData = window.ECOSYSTEMS_DATA ? window.ECOSYSTEMS_DATA[currentBiome.id] : null;
    if (!ecoData) return;

    const isUnlocked = window.progressManager ? window.progressManager.isEcosystemUnlocked(currentBiome.id) : (this.currentIndex === 0);
    const stars = window.progressManager ? window.progressManager.getEcosystemStars(currentBiome.id) : 0;

    // 1. Crossfade Latar Belakang
    const targetBg = ecoData.bg || currentBiome.bg;
    this.bgBottom.setTexture(this.bgTop.texture ? this.bgTop.texture.key : targetBg);
    this.bgTop.setTexture(targetBg).setAlpha(0);

    this.tweens.add({
      targets: this.bgTop,
      alpha: 1,
      duration: 380,
      ease: 'Cubic.easeOut'
    });

    this.tweens.add({
      targets: this.bgDimmer,
      alpha: isUnlocked ? 0.70 : 0.85,
      duration: 350
    });

    // 2. Render Ulang Hero Stage Plaque
    this.renderHeroStagePlaque(currentBiome, ecoData, isUnlocked, stars, animate);

    // 3. Perbarui Status Highlight pada Bottom Dock
    this.updateBottomDockHighlight();
  }

  /**
   * Render Plakat Pahlawan Utama di Panggung Tengah
   */
  renderHeroStagePlaque(biome, ecoData, isUnlocked, stars, animate) {
    this.stageContainer.removeAll(true);

    const plaqueW = 1480;
    const plaqueH = 550;

    // Efek Punch Animasi
    if (animate) {
      this.stageContainer.setScale(0.96);
      this.stageContainer.setAlpha(0.6);
      this.tweens.add({
        targets: this.stageContainer,
        scaleX: 1.0,
        scaleY: 1.0,
        alpha: 1.0,
        duration: 260,
        ease: 'Back.easeOut'
      });
    }

    // 1. Drop Shadow Panggung
    const shadow = this.add.graphics();
    shadow.fillStyle(0x000000, 0.55);
    shadow.fillRoundedRect(-plaqueW / 2 + 6, -plaqueH / 2 + 10, plaqueW, plaqueH, 26);
    this.stageContainer.add(shadow);

    // 2. Frame Kayu Solid & Enamel Dasar
    const frame = this.add.graphics();
    frame.fillStyle(0x0a111e, 1);
    frame.fillRoundedRect(-plaqueW / 2, -plaqueH / 2, plaqueW, plaqueH, 26);

    const faceColor = isUnlocked ? (ecoData.ambientColor || biome.ambientColor) : 0x0f172a;
    frame.fillStyle(faceColor, 0.96);
    frame.fillRoundedRect(-plaqueW / 2 + 5, -plaqueH / 2 + 5, plaqueW - 10, plaqueH - 10, 22);

    const borderColor = isUnlocked ? (ecoData.accentColor || 0xf59e0b) : 0x475569;
    frame.lineStyle(3.5, borderColor, 1);
    frame.strokeRoundedRect(-plaqueW / 2 + 5, -plaqueH / 2 + 5, plaqueW - 10, plaqueH - 10, 22);

    // Hairline Emas Halus
    frame.lineStyle(1.2, isUnlocked ? 0xfef08a : 0x64748b, 0.45);
    frame.strokeRoundedRect(-plaqueW / 2 + 9, -plaqueH / 2 + 9, plaqueW - 18, plaqueH - 18, 18);
    this.stageContainer.add(frame);

    // --- A. HEADER BAR DALAM PLAKAT (Medali & Judul Ekosistem) ---
    const medalX = -plaqueW / 2 + 95;
    const medalY = -plaqueH / 2 + 95;

    // Halo Cahaya Radial
    const halo = this.add.graphics();
    halo.fillStyle(isUnlocked ? borderColor : 0x334155, isUnlocked ? 0.35 : 0.15);
    halo.fillCircle(medalX, medalY, 72);
    this.stageContainer.add(halo);

    const medalRim = this.add.graphics();
    medalRim.fillStyle(0x111827, 1);
    medalRim.fillCircle(medalX, medalY, 56);
    medalRim.lineStyle(3.5, isUnlocked ? 0xfbbf24 : 0x475569, 1);
    medalRim.strokeCircle(medalX, medalY, 56);
    this.stageContainer.add(medalRim);

    const badgeImg = this.add.image(medalX, medalY, biome.badge).setDisplaySize(108, 108);
    if (!isUnlocked) {
      badgeImg.setTint(0x444444);
      badgeImg.setAlpha(0.45);
    }
    this.stageContainer.add(badgeImg);

    if (!isUnlocked) {
      const lockOverlay = this.add.text(medalX, medalY, '🔒', { fontSize: '46px' }).setOrigin(0.5);
      this.stageContainer.add(lockOverlay);
      this.tweens.add({
        targets: lockOverlay,
        scale: { from: 0.9, to: 1.1 },
        duration: 1000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }

    // Teks Judul & Tagline Ekosistem
    const titleLeftX = medalX + 78;
    const titleTxt = this.add.text(titleLeftX, medalY - 26, `${biome.icon} ${ecoData.name.toUpperCase()}`, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '34px',
      color: isUnlocked ? '#ffffff' : '#94a3b8',
      fontStyle: 'bold',
      shadow: { offsetY: 2, color: '#000000', blur: 3, fill: true }
    });

    const tagTxt = this.add.text(titleLeftX, medalY + 20, biome.tagline, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '24px',
      color: isUnlocked ? '#fef08a' : '#64748b',
      fontStyle: 'bold'
    });
    this.stageContainer.add([titleTxt, tagTxt]);

    // Lencana Status Bintang (Kanan Atas Plakat)
    const starStatusX = plaqueW / 2 - 40;
    const starGfx = this.add.graphics();
    starGfx.fillStyle(isUnlocked ? 0x022c22 : 0x1e293b, 0.95);
    starGfx.fillRoundedRect(starStatusX - 270, medalY - 26, 270, 52, 16);
    starGfx.lineStyle(2, isUnlocked ? 0x10b981 : 0x64748b, 1);
    starGfx.strokeRoundedRect(starStatusX - 270, medalY - 26, 270, 52, 16);
    this.stageContainer.add(starGfx);

    const starLabel = isUnlocked ? `⭐ ${stars}/6 BINTANG` : '🔒 TERKUNCI';
    const starColor = isUnlocked ? '#fef08a' : '#f87171';
    const starTxt = this.add.text(starStatusX - 135, medalY, starLabel, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '24px',
      color: starColor,
      fontStyle: 'bold'
    }).setOrigin(0.5);
    this.stageContainer.add(starTxt);

    // --- B. GARIS PEMISAH & DESKRIPSI NARASI ---
    const divLine = this.add.graphics();
    divLine.lineStyle(1.5, isUnlocked ? 0x334155 : 0x1e293b, 0.8);
    divLine.lineBetween(-plaqueW / 2 + 40, -100, plaqueW / 2 - 40, -100);
    this.stageContainer.add(divLine);

    const storyTxt = this.add.text(0, -68, isUnlocked ? ecoData.desc : 'Ekosistem ini masih terkunci! Tuntaskan seluruh misi dan teka-teki kausalitas pada bioma sebelumnya untuk membuka ekspedisi ini.', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '24px',
      color: isUnlocked ? '#e2e8f0' : '#94a3b8',
      align: 'center',
      wordWrap: { width: plaqueW - 120 },
      lineSpacing: 6
    }).setOrigin(0.5);
    this.stageContainer.add(storyTxt);

    // --- C. STRIP ORGANISME & RANTAI MAKANAN KHAS BIOMA ---
    const orgStripY = -8;
    this.renderOrganismsStrip(biome, orgStripY, plaqueW, isUnlocked);

    // --- D. PREVIEW 2 KARTU MISI KRISIS C2 (Side-by-Side) ---
    const missions = ecoData.missions || [];
    const missionCardsY = 120;
    const cardW = 670;
    const cardH = 138;

    // Kartu Misi 1 (Faktor Ulah Alam)
    this.renderMiniMissionCard(-360, missionCardsY, cardW, cardH, missions[0], isUnlocked, 1);

    // Kartu Misi 2 (Faktor Ulah Manusia)
    const isM2Unlocked = isUnlocked && window.progressManager && window.progressManager.isMissionUnlocked(`${biome.id}_m2`);
    this.renderMiniMissionCard(360, missionCardsY, cardW, cardH, missions[1], isM2Unlocked, 2);

    // --- E. TOMBOL AKSI UTAMA DI BAWAH PLAKAT ---
    const btnY = 228;
    if (isUnlocked) {
      const btnW = 560;
      const btnH = 64;
      const btnExplore = this.createButton3D(0, btnY, btnW, btnH, '🚀 SELIDIKI EKOSISTEM INI 🔍', 0x065f46, 0x10b981, () => {
        this.selectBiome(biome);
      });
      this.stageContainer.add(btnExplore);
    } else {
      const prevName = this.getPreviousBiomeName(biome.prevId);
      const btnW = 720;
      const btnH = 64;
      const btnLocked = this.createButton3D(0, btnY, btnW, btnH, `🔒 Selesaikan Ekosistem ${prevName} untuk Membuka!`, 0x1e293b, 0x334155, () => {
        if (window.soundEngine) {
          window.soundEngine.playWarning ? window.soundEngine.playWarning() : window.soundEngine.playBeep();
          window.soundEngine.speakText(`Ekosistem ${biome.name} masih terkunci! Selesaikan ekosistem ${prevName} terlebih dahulu.`);
        }
        // Animasi Shake Plakat
        this.tweens.add({
          targets: this.stageContainer,
          x: this.scale.width / 2 + 10,
          duration: 45,
          yoyo: true,
          repeat: 4,
          onComplete: () => {
            this.stageContainer.x = this.scale.width / 2;
          }
        });
      });
      this.stageContainer.add(btnLocked);
    }
  }

  /**
   * Render Strip Organisme Khas Bioma
   */
  renderOrganismsStrip(biome, y, plaqueW, isUnlocked) {
    const orgs = biome.organisms || [];
    if (orgs.length === 0) return;

    const labelTxt = this.add.text(-plaqueW / 2 + 45, y, '🐾 JARING TROFIK:', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '24px',
      color: '#fbbf24',
      fontStyle: 'bold'
    }).setOrigin(0, 0.5);
    this.stageContainer.add(labelTxt);

    const startX = -plaqueW / 2 + 280;
    const pillW = 175;
    const pillH = 42;

    orgs.forEach((org, idx) => {
      const px = startX + idx * (pillW + 34);
      const pillGfx = this.add.graphics();
      pillGfx.fillStyle(isUnlocked ? 0x021a14 : 0x1e293b, 0.9);
      pillGfx.fillRoundedRect(px - pillW / 2, y - pillH / 2, pillW, pillH, 12);
      pillGfx.lineStyle(1.2, isUnlocked ? 0x10b981 : 0x475569, 0.7);
      pillGfx.strokeRoundedRect(px - pillW / 2, y - pillH / 2, pillW, pillH, 12);
      this.stageContainer.add(pillGfx);

      // Icon & Nama
      const orgTxt = this.add.text(px, y, org.label, {
        fontFamily: 'Nunito, sans-serif',
        fontSize: '24px',
        color: isUnlocked ? '#ffffff' : '#94a3b8',
        fontStyle: 'bold'
      }).setOrigin(0.5);
      this.stageContainer.add(orgTxt);

      // Panah Kausalitas Antar Organisme
      if (idx < orgs.length - 1) {
        const arrowTxt = this.add.text(px + pillW / 2 + 17, y, '➔', {
          fontFamily: 'Fredoka, sans-serif',
          fontSize: '24px',
          color: isUnlocked ? '#fbbf24' : '#475569',
          fontStyle: 'bold'
        }).setOrigin(0.5);
        this.stageContainer.add(arrowTxt);
      }
    });
  }

  /**
   * Render Mini Preview Kartu Misi di Dalam Plakat
   */
  renderMiniMissionCard(x, y, w, h, mission, isMissionUnlocked, num) {
    if (!mission) return;

    const mCard = this.add.graphics();
    mCard.fillStyle(0x030712, 0.75);
    mCard.fillRoundedRect(x - w / 2, y - h / 2, w, h, 14);

    const borderCol = isMissionUnlocked ? (num === 1 ? 0xf59e0b : 0xf43f5e) : 0x334155;
    mCard.lineStyle(1.8, borderCol, 0.9);
    mCard.strokeRoundedRect(x - w / 2, y - h / 2, w, h, 14);
    this.stageContainer.add(mCard);

    // Tag Kategori
    const tagColor = num === 1 ? '#fbbf24' : '#fb7185';
    const tagTxt = this.add.text(x - w / 2 + 16, y - h / 2 + 16, `${num === 1 ? '☀️ FAKTOR ALAM' : '⚠️ FAKTOR MANUSIA'} • ${mission.title}`, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '24px',
      color: isMissionUnlocked ? tagColor : '#94a3b8',
      fontStyle: 'bold'
    });

    const descTxt = this.add.text(x - w / 2 + 16, y - h / 2 + 50, isMissionUnlocked ? mission.headline : 'Selesaikan Misi 1 terlebih dahulu untuk membuka investigasi ini.', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '24px',
      color: isMissionUnlocked ? '#e2e8f0' : '#64748b',
      wordWrap: { width: w - 32 }
    });
    this.stageContainer.add([tagTxt, descTxt]);

    // Status Pill
    const mData = window.progressManager ? window.progressManager.getMissionData(mission.id) : null;
    const isCompleted = mData ? mData.completed : false;
    const mStars = mData ? mData.stars : 0;

    let statusPill = '⚡ Siap Diselidiki';
    let statusColor = '#38bdf8';
    if (!isMissionUnlocked) {
      statusPill = '🔒 Terkunci';
      statusColor = '#94a3b8';
    } else if (isCompleted) {
      statusPill = `✅ Tuntas (${'⭐'.repeat(mStars)})`;
      statusColor = '#4ade80';
    }

    const statTxt = this.add.text(x - w / 2 + 16, y + h / 2 - 22, statusPill, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '24px',
      color: statusColor,
      fontStyle: 'bold'
    });
    this.stageContainer.add(statTxt);
  }

  /**
   * Bilah Dock Thumbnail 4 Bioma di Bawah Layar
   */
  createBottomDock(width) {
    const dockY = 890;
    this.dockTiles = [];

    const tileW = 340;
    const tileH = 92;
    const centers = [width / 2 - 555, width / 2 - 185, width / 2 + 185, width / 2 + 555];

    this.biomes.forEach((b, idx) => {
      const cx = centers[idx];
      const isUnlocked = window.progressManager ? window.progressManager.isEcosystemUnlocked(b.id) : (idx === 0);
      const stars = window.progressManager ? window.progressManager.getEcosystemStars(b.id) : 0;

      const container = this.add.container(cx, dockY);

      // Graphics Tile
      const gShadow = this.add.graphics();
      const gBox = this.add.graphics();
      container.add([gShadow, gBox]);

      // Mini Badge
      const miniBadge = this.add.image(-tileW / 2 + 45, 0, b.badge).setDisplaySize(58, 58);
      if (!isUnlocked) {
        miniBadge.setTint(0x444444);
        miniBadge.setAlpha(0.5);
      }
      container.add(miniBadge);

      // Teks Nama Bioma
      const nameTxt = this.add.text(-tileW / 2 + 82, -18, `${b.icon} ${b.shortName}`, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '24px',
        color: '#ffffff',
        fontStyle: 'bold'
      });

      const starTxt = this.add.text(-tileW / 2 + 84, 16, isUnlocked ? `⭐ ${stars}/6 Bintang` : '🔒 Terkunci', {
        fontFamily: 'Nunito, sans-serif',
        fontSize: '24px',
        color: isUnlocked ? '#a7f3d0' : '#f87171',
        fontStyle: 'bold'
      });
      container.add([nameTxt, starTxt]);

      // Hit Area
      const hit = this.add.rectangle(0, 0, tileW, tileH, 0x000000, 0.001)
        .setInteractive({ useHandCursor: true });
      container.add(hit);

      hit.on('pointerdown', () => {
        if (this.currentIndex !== idx) {
          this.currentIndex = idx;
          this.registry.set('selectedBiomeIndex', this.currentIndex);
          if (window.soundEngine) window.soundEngine.playBeep();
          this.updateBiomeView(true);
        }
      });

      this.dockTiles.push({
        container, gShadow, gBox, isUnlocked, tileW, tileH, baseY: dockY
      });
    });
  }

  /**
   * Perbarui Efek Highlight pada Dock Bawah
   */
  updateBottomDockHighlight() {
    this.dockTiles.forEach((tile, idx) => {
      const isActive = (idx === this.currentIndex);
      const { container, gShadow, gBox, isUnlocked, tileW, tileH, baseY } = tile;

      gShadow.clear();
      gBox.clear();

      if (isActive) {
        container.setY(baseY - 8);
        container.setAlpha(1.0);

        // Glow Shadow Emas
        gShadow.fillStyle(0x000000, 0.6);
        gShadow.fillRoundedRect(-tileW / 2 + 4, -tileH / 2 + 6, tileW, tileH, 16);

        // Active Golden Face
        gBox.fillStyle(isUnlocked ? 0x064e3b : 0x1e293b, 0.98);
        gBox.fillRoundedRect(-tileW / 2, -tileH / 2, tileW, tileH, 16);
        gBox.lineStyle(3.5, 0xf59e0b, 1);
        gBox.strokeRoundedRect(-tileW / 2, -tileH / 2, tileW, tileH, 16);
      } else {
        container.setY(baseY);
        container.setAlpha(0.78);

        gShadow.fillStyle(0x000000, 0.35);
        gShadow.fillRoundedRect(-tileW / 2 + 2, -tileH / 2 + 4, tileW, tileH, 14);

        gBox.fillStyle(0x0a111e, 0.85);
        gBox.fillRoundedRect(-tileW / 2, -tileH / 2, tileW, tileH, 14);
        gBox.lineStyle(1.8, 0x334155, 0.8);
        gBox.strokeRoundedRect(-tileW / 2, -tileH / 2, tileW, tileH, 14);
      }
    });
  }

  /**
   * Suara Panduan Gita Sesuai Bioma Aktif
   */
  playGitaBiomeIntro() {
    const cur = this.biomes[this.currentIndex];
    const speechMap = {
      sawah: 'Ekosistem sawah terestrial! Lahan pertanian padi tempat berinteraksinya petani, hama pengerat, dan predator pemangsa alami.',
      hutan: 'Ekosistem rimba hujan tropis! Paru-paru Nusantara rumah bagi pohon raksasa, kawanan rusa, dan harimau Sumatera.',
      sungai: 'Ekosistem perairan sungai air tawar! Sumber kehidupan bagi ikan tawar, tumbuhan air teratai, dan burung bangau.',
      laut: 'Ekosistem samudra terumbu karang tropis! Hamparan karang warna-warni tempat hidup kawanan penyu dan ikan hiu.'
    };
    const voiceText = speechMap[cur.id] || 'Pilih ekosistem Nusantara yang terbuka untuk diselidiki!';
    if (window.soundEngine) {
      window.soundEngine.speakText(voiceText);
    }
  }

  getPreviousBiomeName(prevId) {
    if (!prevId) return 'Sebelumnya';
    const found = this.biomes.find(b => b.id === prevId);
    return found ? found.shortName : 'Sebelumnya';
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
      fontSize: label.length > 3 ? '24px' : '30px',
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
    const bannerBg = this.add.rectangle(0, 0, 1020, 70, 0x064e3b, 0.98);
    bannerBg.setStrokeStyle(3, 0xfbbf24);
    const bannerTxt = this.add.text(0, 0, '🎓 MODE PENGUJI AKTIF: 4 BIOMA & 8 MISI TERBUKA (24 BINTANG)!', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '26px',
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

    const backdrop = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.82)
      .setInteractive();
    modalContainer.add(backdrop);

    const boxW = 960;
    const boxH = 380;
    const box = this.add.rectangle(width / 2, height / 2, boxW, boxH, 0x064e3b, 0.98);
    box.setStrokeStyle(4, 0xf59e0b);
    const innerBorder = this.add.rectangle(width / 2, height / 2, boxW - 12, boxH - 12);
    innerBorder.setStrokeStyle(1.5, 0xfef08a, 0.4);
    modalContainer.add([box, innerBorder]);

    const titleText = this.add.text(width / 2, height / 2 - 110, title, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '34px',
      color: '#fef08a',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    modalContainer.add(titleText);

    const descText = this.add.text(width / 2, height / 2 - 40, message, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '24px',
      color: '#e2e8f0',
      fontStyle: 'bold',
      align: 'center',
      wordWrap: { width: boxW - 80 },
      lineSpacing: 6
    }).setOrigin(0.5);
    modalContainer.add(descText);

    const btnCancel = this.add.rectangle(width / 2 - 190, height / 2 + 85, 280, 64, 0x047857)
      .setInteractive({ useHandCursor: true });
    btnCancel.setStrokeStyle(2.5, 0x34d399);
    const tCancel = this.add.text(width / 2 - 190, height / 2 + 85, '❌ BATAL', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '26px',
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

    const btnYes = this.add.rectangle(width / 2 + 190, height / 2 + 85, 280, 64, 0x991b1b)
      .setInteractive({ useHandCursor: true });
    btnYes.setStrokeStyle(2.5, 0xf87171);
    const tYes = this.add.text(width / 2 + 190, height / 2 + 85, '✅ YA, RESET', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '26px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    modalContainer.add([btnYes, tYes]);

    btnYes.on('pointerdown', () => {
      btnYes.setScale(0.94);
      if (window.soundEngine) window.soundEngine.playSuccess();
      this.time.delayedCall(120, () => {
        modalContainer.destroy();
        onYes();
      });
    });
  }
}

window.BiomeSelectScene = BiomeSelectScene;
