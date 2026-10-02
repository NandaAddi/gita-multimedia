/**
 * ECO-EXPLORER (PHASER 3) - BIOME SELECT SCENE
 * Master 2-Column Split Hero Stage Showcase (Format Panggung 2-Kolom Bebas Tabrakan):
 * - Kolom Kiri: Medali Bioma Besar + Judul & Tagline + Kotak Deskripsi Ekologis + Tombol Aksi Chunky 3D
 * - Kolom Kanan: Header Rantai Makanan + Single-Line Sleek Organisme Khas Bioma + 2 Kartu Misi Bertumpuk yang Lega
 * - Bilah Navigasi Atas Emas-Zamrud Terpadu (Lencana Tim 5-Tap Mode Penguji + Tombol Pill Seragam)
 * - Dok 4 Bioma Bawah dengan Sorotan Emas Mengkilap pada Bioma Aktif
 * - Standar Tipografi Ultra-Large IFP (Seluruh font >= 24px, zero text overflow, zero clipping)
 * - 100% Offline & Kompatibel Protokol file:// (Bebas CORS)
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
          { key: 'bangau', label: 'Bangau' }
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
          { key: 'karang', label: 'Karang' },
          { key: 'ikan_kecil', label: 'Ikan Karang' },
          { key: 'penyu', label: 'Penyu' },
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

    // 2. Top Header Status Tim Aktif (Tema Emerald Enamel & Polished Gold)
    this.createTopHeader(width, activeTeam);

    // 3. Kontainer Panggung Utama (Hero Stage Plaque) di Tengah Layar
    this.stageContainer = this.add.container(width / 2, 465);

    // 4. Tombol Panah Navigasi Layar Sentuh IFP (◀ dan ▶)
    this.createNavArrows(width);

    // 5. Bilah Dock Thumbnail Bioma di Bawah Layar
    this.createBottomDock(width);

    // 6. Sub-Panduan Bawah Layar Sentuh IFP
    this.add.text(width / 2, height - 32, '💡 Sentuh panah ◀ ▶, geser layar (swipe), atau ketuk kartu di bawah untuk memilih ekosistem', {
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
   * Header Status Tim & Navigasi Utama (Bebas Tabrakan & Bertema Emerald Gold)
   */
  createTopHeader(width, activeTeam) {
    const headerW = 1760;
    const headerH = 74;
    const headerY = 52;

    const headerLeft = width / 2 - headerW / 2;
    const headerRight = width / 2 + headerW / 2;

    const gHead = this.add.graphics();
    // Drop shadow
    gHead.fillStyle(0x000000, 0.45);
    gHead.fillRoundedRect(headerLeft + 4, headerY - headerH / 2 + 5, headerW, headerH, 18);

    // Dark Enamel Base
    gHead.fillStyle(0x021a14, 1);
    gHead.fillRoundedRect(headerLeft, headerY - headerH / 2, headerW, headerH, 18);

    // Emerald Face
    gHead.fillStyle(0x064e3b, 0.96);
    gHead.fillRoundedRect(headerLeft + 3, headerY - headerH / 2 + 3, headerW - 6, headerH - 6, 15);

    // Polished Gold Border
    gHead.lineStyle(2.5, 0xf59e0b, 1);
    gHead.strokeRoundedRect(headerLeft + 3, headerY - headerH / 2 + 3, headerW - 6, headerH - 6, 15);

    // Medallion Lencana Tim (Dengan Secret Trigger Mode Penguji: Ketuk 5x)
    const badgeX = headerLeft + 48;
    const badgeRim = this.add.graphics();
    badgeRim.fillStyle(0x021a14, 1);
    badgeRim.fillCircle(badgeX, headerY, 30);
    badgeRim.lineStyle(2.5, 0xf59e0b, 1);
    badgeRim.strokeCircle(badgeX, headerY, 30);

    const badgeImg = this.add.image(badgeX, headerY, activeTeam.badge || 'badge_elang')
      .setDisplaySize(56, 56)
      .setInteractive({ useHandCursor: true });

    let secretTapCount = 0;
    let secretTapTimer = null;
    badgeImg.on('pointerdown', () => {
      badgeImg.setScale(0.9);
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

    const titleX = badgeX + 46;
    this.add.text(titleX, headerY - 14, `PETA EKOSISTEM NUSANTARA`, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '26px',
      color: '#fef08a',
      fontStyle: 'bold',
      shadow: { offsetY: 2, color: '#000000', blur: 3, fill: true }
    });

    this.add.text(titleX, headerY + 14, `⭐ Giliran: ${activeTeam.name} (${totalStars}/24 Bintang Terkumpul)`, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '24px',
      color: '#a7f3d0',
      fontStyle: 'bold'
    });

    // Kontrol Kanan (Tombol Pill Seragam Emas-Zamrud)
    const innerRight = headerRight - 20;
    const btnGap = 14;
    const btnH = 48;

    // 1. Tombol Reset Kelas (Paling Kanan)
    const wReset = 180;
    const xReset = innerRight - wReset / 2;
    this.createPillButton({
      x: xReset,
      y: headerY,
      w: wReset,
      h: btnH,
      baseColor: 0x334155,
      shadowColor: 0x1e293b,
      borderColor: 0x64748b,
      text: '⚙️ Reset Kelas',
      textColor: '#ffffff',
      fontSize: '24px',
      onClick: () => {
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
      }
    });

    // 2. Tombol Ganti Tim (Tengah)
    const wTeam = 175;
    const xTeam = (xReset - wReset / 2) - btnGap - wTeam / 2;
    this.createPillButton({
      x: xTeam,
      y: headerY,
      w: wTeam,
      h: btnH,
      baseColor: 0x0a353c,
      shadowColor: 0x021a14,
      borderColor: 0x38bdf8,
      text: '👥 Ganti Tim',
      textColor: '#ffffff',
      fontSize: '24px',
      onClick: () => {
        if (window.soundEngine) {
          window.soundEngine.playBeep();
          window.soundEngine.stopVoice();
        }
        this.time.delayedCall(120, () => {
          this.scene.start('TeamSelectScene');
        });
      }
    });

    // 3. Tombol Suara Panduan Gita
    const wAudio = 135;
    const xAudio = (xTeam - wTeam / 2) - btnGap - wAudio / 2;
    this.createPillButton({
      x: xAudio,
      y: headerY,
      w: wAudio,
      h: btnH,
      baseColor: 0x0284c7,
      shadowColor: 0x0369a1,
      borderColor: 0x38bdf8,
      text: '🔊 Suara',
      textColor: '#ffffff',
      fontSize: '24px',
      onClick: () => {
        if (window.soundEngine) {
          window.soundEngine.playBeep();
          this.playGitaBiomeIntro();
        }
      }
    });
  }

  /**
   * Tombol Panah Navigasi Layar Sentuh IFP (◀ dan ▶)
   */
  createNavArrows(width) {
    const arrowY = 465;
    const arrowW = 84;
    const arrowH = 120;
    const arrowRadius = 22;

    const createArrowBtn = (x, symbol, dir) => {
      const container = this.add.container(x, arrowY);
      const gfx = this.add.graphics();

      const drawArrow = (pressed) => {
        gfx.clear();
        const dy = pressed ? 3 : 0;
        // Drop shadow
        gfx.fillStyle(0x000000, 0.5);
        gfx.fillRoundedRect(-arrowW / 2 + 3, -arrowH / 2 + 5, arrowW, arrowH, arrowRadius);
        // Dark enamel base
        gfx.fillStyle(0x021a14, 0.96);
        gfx.fillRoundedRect(-arrowW / 2, -arrowH / 2, arrowW, arrowH, arrowRadius);
        // Face emerald
        gfx.fillStyle(0x064e3b, 0.95);
        gfx.fillRoundedRect(-arrowW / 2 + 3, -arrowH / 2 + dy + 3, arrowW - 6, arrowH - 6, arrowRadius - 3);
        // Gold border
        gfx.lineStyle(2.5, 0xf59e0b, 1);
        gfx.strokeRoundedRect(-arrowW / 2 + 3, -arrowH / 2 + dy + 3, arrowW - 6, arrowH - 6, arrowRadius - 3);
      };

      drawArrow(false);
      container.add(gfx);

      const label = this.add.text(0, 0, symbol, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '44px',
        color: '#fef08a',
        fontStyle: 'bold'
      }).setOrigin(0.5);
      container.add(label);

      container.setSize(arrowW, arrowH);
      container.setInteractive({ useHandCursor: true });

      container.on('pointerover', () => container.setScale(1.06));
      container.on('pointerout', () => container.setScale(1.0));
      container.on('pointerdown', () => {
        drawArrow(true);
        label.y = 3;
        this.time.delayedCall(120, () => {
          drawArrow(false);
          label.y = 0;
        });
        this.navigateBiome(dir);
      });

      return container;
    };

    this.btnPrev = createArrowBtn(105, '◀', -1);
    this.btnNext = createArrowBtn(width - 105, '▶', 1);
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

    // 2. Render Ulang Hero Stage Plaque (2-Kolom Terpisah)
    this.renderHeroStagePlaque(currentBiome, ecoData, isUnlocked, stars, animate);

    // 3. Perbarui Status Highlight pada Bottom Dock
    this.updateBottomDockHighlight();
  }

  /**
   * Render Plakat Pahlawan Utama di Panggung Tengah (2-Kolom Terpisah Seimbang)
   */
  renderHeroStagePlaque(biome, ecoData, isUnlocked, stars, animate) {
    this.stageContainer.removeAll(true);

    const plaqueW = 1540;
    const plaqueH = 580;

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

    // 2. Base & Frame Enamel Zamrud Mewah
    const frame = this.add.graphics();
    frame.fillStyle(0x021a14, 1);
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

    // Garis Vertikal Pemisah Antara Kolom Kiri & Kolom Kanan
    const dividerX = -50;
    frame.lineStyle(1.8, isUnlocked ? borderColor : 0x334155, 0.5);
    frame.lineBetween(dividerX, -plaqueH / 2 + 25, dividerX, plaqueH / 2 - 25);
    this.stageContainer.add(frame);

    // ==========================================
    // KOLOM KIRI: IDENTITAS BIOMA & TOMBOL AKSI
    // ==========================================
    const leftCenterX = -plaqueW / 2 + (plaqueW / 2 + dividerX) / 2; // Sekitar -410 px
    const leftColW = (plaqueW / 2 + dividerX) - 50;                 // Sekitar 640 px

    // Baris 1: Medali Ekosistem Besar + Lencana Bintang
    const topRowY = -plaqueH / 2 + 82;
    const medalX = -plaqueW / 2 + 90;

    // Halo Cahaya Radial
    const halo = this.add.graphics();
    halo.fillStyle(isUnlocked ? borderColor : 0x334155, isUnlocked ? 0.35 : 0.15);
    halo.fillCircle(medalX, topRowY, 68);
    this.stageContainer.add(halo);

    const medalRim = this.add.graphics();
    medalRim.fillStyle(0x021a14, 1);
    medalRim.fillCircle(medalX, topRowY, 52);
    medalRim.lineStyle(3, isUnlocked ? 0xf59e0b : 0x475569, 1);
    medalRim.strokeCircle(medalX, topRowY, 52);
    this.stageContainer.add(medalRim);

    const badgeImg = this.add.image(medalX, topRowY, biome.badge).setDisplaySize(100, 100);
    if (!isUnlocked) {
      badgeImg.setTint(0x444444);
      badgeImg.setAlpha(0.45);
    }
    this.stageContainer.add(badgeImg);

    if (!isUnlocked) {
      const lockOverlay = this.add.text(medalX, topRowY, '🔒', { fontSize: '44px' }).setOrigin(0.5);
      this.stageContainer.add(lockOverlay);
    }

    // Status Bintang Kapsul (Sebelah Kanan Medali)
    const starStatusX = medalX + 70;
    const starW = 240;
    const starH = 46;
    const starGfx = this.add.graphics();
    starGfx.fillStyle(isUnlocked ? 0x022c22 : 0x1e293b, 0.95);
    starGfx.fillRoundedRect(starStatusX, topRowY - starH / 2, starW, starH, 14);
    starGfx.lineStyle(2, isUnlocked ? 0x10b981 : 0x64748b, 1);
    starGfx.strokeRoundedRect(starStatusX, topRowY - starH / 2, starW, starH, 14);
    this.stageContainer.add(starGfx);

    const starLabel = isUnlocked ? `⭐ ${stars}/6 BINTANG` : '🔒 TERKUNCI';
    const starColor = isUnlocked ? '#fef08a' : '#f87171';
    const starTxt = this.add.text(starStatusX + starW / 2, topRowY, starLabel, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '24px',
      color: starColor,
      fontStyle: 'bold'
    }).setOrigin(0.5);
    this.stageContainer.add(starTxt);

    // Baris 2: Nama Ekosistem & Tagline
    const titleY = -plaqueH / 2 + 168;
    const titleTxt = this.add.text(-plaqueW / 2 + 35, titleY, `${biome.icon} ${ecoData.name.toUpperCase()}`, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '32px',
      color: isUnlocked ? '#ffffff' : '#94a3b8',
      fontStyle: 'bold',
      shadow: { offsetY: 2, color: '#000000', blur: 3, fill: true }
    });

    const tagTxt = this.add.text(-plaqueW / 2 + 35, titleY + 40, `"${biome.tagline}"`, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '24px',
      color: isUnlocked ? '#fde68a' : '#64748b',
      fontStyle: 'bold'
    });
    this.stageContainer.add([titleTxt, tagTxt]);

    // Baris 3: Kotak Deskripsi Ekologis Sains Mandiri
    const descBoxY = titleY + 84;
    const descBoxW = leftColW;
    const descBoxH = 126;

    const descBoxGfx = this.add.graphics();
    descBoxGfx.fillStyle(0x021a14, 0.9);
    descBoxGfx.fillRoundedRect(-plaqueW / 2 + 35, descBoxY, descBoxW, descBoxH, 16);
    descBoxGfx.lineStyle(1.8, isUnlocked ? borderColor : 0x334155, 0.8);
    descBoxGfx.strokeRoundedRect(-plaqueW / 2 + 35, descBoxY, descBoxW, descBoxH, 16);
    this.stageContainer.add(descBoxGfx);

    const descContent = isUnlocked
      ? ecoData.desc
      : 'Ekosistem ini masih terkunci! Selesaikan seluruh misi dan kuis kausalitas pada bioma sebelumnya untuk membuka ekspedisi petualangan ini.';

    const storyTxt = this.add.text(-plaqueW / 2 + 50, descBoxY + 16, descContent, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '24px',
      color: isUnlocked ? '#e2e8f0' : '#94a3b8',
      wordWrap: { width: descBoxW - 30 },
      lineSpacing: 5
    });
    this.stageContainer.add(storyTxt);

    // Baris 4: Tombol Aksi Chunky 3D Raksasa
    const btnActionY = descBoxY + descBoxH + 46;
    const btnW = descBoxW;
    const btnH = 72;
    const btnActionX = -plaqueW / 2 + 35 + btnW / 2;

    if (isUnlocked) {
      const btnContainer = this.add.container(btnActionX, btnActionY);
      const btnGfx = this.add.graphics();

      const drawBtn = (isPressed) => {
        btnGfx.clear();
        const dy = isPressed ? 4 : 0;
        btnGfx.fillStyle(0x064e3b, 1);
        btnGfx.fillRoundedRect(-btnW / 2, -btnH / 2 + 5, btnW, btnH, 18);
        btnGfx.fillStyle(0x10b981, 1);
        btnGfx.fillRoundedRect(-btnW / 2, -btnH / 2 + dy, btnW, btnH - 5, 18);
        btnGfx.lineStyle(2.5, 0xfef08a, 1);
        btnGfx.strokeRoundedRect(-btnW / 2, -btnH / 2 + dy, btnW, btnH - 5, 18);
      };

      drawBtn(false);
      btnContainer.add(btnGfx);

      const btnLabel = this.add.text(0, 0, '👉 SELIDIKI EKOSISTEM INI! 🚀', {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '30px',
        color: '#ffffff',
        fontStyle: 'bold',
        shadow: { offsetY: 2, color: '#000000', blur: 4, fill: true }
      }).setOrigin(0.5);
      btnContainer.add(btnLabel);

      btnContainer.setSize(btnW, btnH);
      btnContainer.setInteractive({ useHandCursor: true });

      btnContainer.on('pointerover', () => {
        btnContainer.setScale(1.02);
        if (window.soundEngine) window.soundEngine.playBeep();
      });
      btnContainer.on('pointerout', () => btnContainer.setScale(1.0));

      btnContainer.on('pointerdown', () => {
        drawBtn(true);
        btnLabel.y = 3;

        // Shockwave Ring
        const ring = this.add.circle(this.stageContainer.x + btnActionX, this.stageContainer.y + btnActionY, 36, 0xfef08a, 0.85);
        ring.setDepth(50);
        this.tweens.add({
          targets: ring,
          scale: 4.5,
          alpha: 0,
          duration: 450,
          ease: 'Cubic.easeOut',
          onComplete: () => ring.destroy()
        });

        if (window.soundEngine) window.soundEngine.playSuccess();
        this.time.delayedCall(160, () => {
          this.selectBiome(biome);
        });
      });

      btnContainer.on('pointerup', () => {
        drawBtn(false);
        btnLabel.y = 0;
      });

      this.stageContainer.add(btnContainer);
    } else {
      const prevName = this.getPreviousBiomeName(biome.prevId);
      const btnLocked = this.createPillButton({
        x: btnActionX,
        y: btnActionY,
        w: btnW,
        h: btnH,
        baseColor: 0x1e293b,
        shadowColor: 0x0f172a,
        borderColor: 0x475569,
        text: `🔒 Selesaikan Ekosistem ${prevName}!`,
        textColor: '#94a3b8',
        fontSize: '26px',
        onClick: () => {
          if (window.soundEngine) {
            window.soundEngine.playWarning ? window.soundEngine.playWarning() : window.soundEngine.playBeep();
            window.soundEngine.speakText(`Ekosistem ${biome.name} masih terkunci! Selesaikan ekosistem ${prevName} terlebih dahulu.`);
          }
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
        }
      });
      this.stageContainer.add(btnLocked);
    }

    // ==========================================
    // KOLOM KANAN: JARING TROFIK & 2 KARTU MISI
    // ==========================================
    const rightStartX = dividerX + 35;
    const rightColW = (plaqueW / 2 - rightStartX) - 30; // Sekitar 760 px

    // 1. Jaring Trofik / Rantai Makanan (Header di Baris Tersendiri -> Zero Collision!)
    const trophicHeaderY = -plaqueH / 2 + 52;
    const trophicHeaderTxt = this.add.text(rightStartX, trophicHeaderY, '🐾 RANTAI MAKANAN UTAMA:', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '24px',
      color: '#fbbf24',
      fontStyle: 'bold'
    });
    this.stageContainer.add(trophicHeaderTxt);

    // Deretan Pil Organisme Sleek Single-Line
    const trophicRowY = trophicHeaderY + 44;
    this.renderSingleLineTrophicChain(biome, rightStartX, trophicRowY, rightColW, isUnlocked);

    // 2. Dua Kartu Misi Bertumpuk Vertikal yang Lega
    const missions = ecoData.missions || [];
    const missionCardW = rightColW;
    const missionCardH = 152;
    const missionGap = 18;

    // Kartu Misi 1 (Faktor Ulah Alam)
    const m1Y = trophicRowY + 40 + missionCardH / 2;
    this.renderStackedMissionCard(rightStartX + missionCardW / 2, m1Y, missionCardW, missionCardH, missions[0], isUnlocked, 1);

    // Kartu Misi 2 (Faktor Ulah Manusia)
    const isM2Unlocked = isUnlocked && window.progressManager && window.progressManager.isMissionUnlocked(`${biome.id}_m2`);
    const m2Y = m1Y + missionCardH + missionGap;
    this.renderStackedMissionCard(rightStartX + missionCardW / 2, m2Y, missionCardW, missionCardH, missions[1], isM2Unlocked, 2);
  }

  /**
   * Render Deretan Rantai Makanan Single Line Sleek (Bebas Tabrakan 100%)
   */
  renderSingleLineTrophicChain(biome, startX, y, totalW, isUnlocked) {
    const orgs = biome.organisms || [];
    if (orgs.length === 0) return;

    const count = orgs.length;
    // Hitung lebar pil dan jarak panah secara presisi
    const arrowW = 28;
    const availablePillSpace = totalW - ((count - 1) * arrowW);
    const pillW = Math.min(150, Math.floor(availablePillSpace / count));
    const pillH = 44;
    const gap = (totalW - (count * pillW)) / Math.max(1, count - 1);

    orgs.forEach((org, idx) => {
      const px = startX + (idx * (pillW + gap)) + pillW / 2;

      const pillGfx = this.add.graphics();
      pillGfx.fillStyle(isUnlocked ? 0x021a14 : 0x1e293b, 0.95);
      pillGfx.fillRoundedRect(px - pillW / 2, y - pillH / 2, pillW, pillH, 12);
      pillGfx.lineStyle(1.5, isUnlocked ? 0x10b981 : 0x475569, 0.85);
      pillGfx.strokeRoundedRect(px - pillW / 2, y - pillH / 2, pillW, pillH, 12);
      this.stageContainer.add(pillGfx);

      const orgTxt = this.add.text(px, y, org.label, {
        fontFamily: 'Nunito, sans-serif',
        fontSize: '24px',
        color: isUnlocked ? '#ffffff' : '#94a3b8',
        fontStyle: 'bold'
      }).setOrigin(0.5);
      this.stageContainer.add(orgTxt);

      // Panah Emas Antar Organisme
      if (idx < count - 1) {
        const ax = px + pillW / 2 + gap / 2;
        const arrowTxt = this.add.text(ax, y, '➔', {
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
   * Render Kartu Misi Bertumpuk Vertikal yang Lega (Anti-Clipping & Anti-Overflow)
   */
  renderStackedMissionCard(cx, cy, w, h, mission, isMissionUnlocked, num) {
    if (!mission) return;

    const mCard = this.add.graphics();
    mCard.fillStyle(0x021a14, 0.94);
    mCard.fillRoundedRect(cx - w / 2, cy - h / 2, w, h, 16);

    const borderCol = isMissionUnlocked ? (num === 1 ? 0xf59e0b : 0xf43f5e) : 0x334155;
    mCard.lineStyle(2, borderCol, 0.9);
    mCard.strokeRoundedRect(cx - w / 2, cy - h / 2, w, h, 16);
    this.stageContainer.add(mCard);

    const leftMargin = cx - w / 2 + 20;

    // Baris 1: Tag Kategori Misi
    const tagColor = num === 1 ? '#fbbf24' : '#fb7185';
    const tagTxt = this.add.text(leftMargin, cy - h / 2 + 18, `${num === 1 ? '☀️ FAKTOR ALAM' : '⚠️ FAKTOR MANUSIA'} • Misi ${num}: ${mission.title}`, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '24px',
      color: isMissionUnlocked ? tagColor : '#94a3b8',
      fontStyle: 'bold'
    });

    // Baris 2: Deskripsi Misi
    const headlineText = isMissionUnlocked
      ? mission.headline
      : 'Selesaikan Misi 1 terlebih dahulu untuk membuka investigasi penyelamatan ini.';

    const descTxt = this.add.text(leftMargin, cy - h / 2 + 56, headlineText, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '24px',
      color: isMissionUnlocked ? '#e2e8f0' : '#64748b',
      wordWrap: { width: w - 40 }
    });
    this.stageContainer.add([tagTxt, descTxt]);

    // Baris 3: Status Kapsul (Memiliki Ruang Vertikal Cukup, Bebas Clipping Garis Bawah)
    const mData = window.progressManager ? window.progressManager.getMissionData(mission.id) : null;
    const isCompleted = mData ? mData.completed : false;
    const mStars = mData ? mData.stars : 0;

    let statusPill = '⚡ Siap Diselidiki';
    let statusColor = '#38bdf8';
    if (!isMissionUnlocked) {
      statusPill = '🔒 Terkunci';
      statusColor = '#f87171';
    } else if (isCompleted) {
      statusPill = `✅ Misi Tuntas (${'⭐'.repeat(mStars)})`;
      statusColor = '#4ade80';
    }

    const statTxt = this.add.text(leftMargin, cy + h / 2 - 34, statusPill, {
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
    const dockY = 925;
    this.dockTiles = [];

    const tileW = 340;
    const tileH = 86;
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
      const miniBadge = this.add.image(-tileW / 2 + 45, 0, b.badge).setDisplaySize(54, 54);
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
        container, gShadow, gBox, isUnlocked, tileW, tileH, baseY: dockY, nameTxt, starTxt
      });
    });
  }

  /**
   * Perbarui Efek Highlight pada Dock Bawah
   */
  updateBottomDockHighlight() {
    this.dockTiles.forEach((tile, idx) => {
      const isActive = (idx === this.currentIndex);
      const { container, gShadow, gBox, isUnlocked, tileW, tileH, baseY, nameTxt } = tile;

      gShadow.clear();
      gBox.clear();

      if (isActive) {
        container.setY(baseY - 6);
        container.setAlpha(1.0);

        // Glow Shadow Emas
        gShadow.fillStyle(0x000000, 0.55);
        gShadow.fillRoundedRect(-tileW / 2 + 3, -tileH / 2 + 5, tileW, tileH, 18);

        // Active Emerald Face
        gBox.fillStyle(0x064e3b, 1);
        gBox.fillRoundedRect(-tileW / 2, -tileH / 2, tileW, tileH, 18);
        gBox.lineStyle(3.5, 0xf59e0b, 1);
        gBox.strokeRoundedRect(-tileW / 2, -tileH / 2, tileW, tileH, 18);

        nameTxt.setColor('#fef08a');
      } else {
        container.setY(baseY);
        container.setAlpha(0.8);

        gShadow.fillStyle(0x000000, 0.35);
        gShadow.fillRoundedRect(-tileW / 2 + 2, -tileH / 2 + 4, tileW, tileH, 16);

        gBox.fillStyle(0x021a14, 0.92);
        gBox.fillRoundedRect(-tileW / 2, -tileH / 2, tileW, tileH, 16);
        gBox.lineStyle(2, 0x334155, 0.85);
        gBox.strokeRoundedRect(-tileW / 2, -tileH / 2, tileW, tileH, 16);

        nameTxt.setColor('#94a3b8');
      }
    });
  }

  /**
   * Helper Tombol Pill Navigasi
   */
  createPillButton({ x, y, w, h, baseColor, shadowColor, borderColor, text, textColor, fontSize, onClick }) {
    const btnContainer = this.add.container(x, y);
    const pillGfx = this.add.graphics();

    const drawPill = (isPressed) => {
      pillGfx.clear();
      const dy = isPressed ? 3 : 0;
      pillGfx.fillStyle(shadowColor, 1);
      pillGfx.fillRoundedRect(-w / 2, -h / 2 + 3, w, h, h / 2);
      pillGfx.fillStyle(baseColor, 0.95);
      pillGfx.fillRoundedRect(-w / 2, -h / 2 + dy, w, h - 3, h / 2);
      pillGfx.lineStyle(2, borderColor, 1);
      pillGfx.strokeRoundedRect(-w / 2, -h / 2 + dy, w, h - 3, h / 2);
    };

    drawPill(false);
    btnContainer.add(pillGfx);

    const label = this.add.text(0, 0, text, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: fontSize || '24px',
      color: textColor || '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    btnContainer.add(label);
    btnContainer.label = label;

    btnContainer.setSize(w, h);
    btnContainer.setInteractive({ useHandCursor: true });

    btnContainer.on('pointerover', () => {
      btnContainer.setScale(1.04);
    });

    btnContainer.on('pointerout', () => {
      btnContainer.setScale(1.0);
    });

    btnContainer.on('pointerdown', () => {
      drawPill(true);
      label.y = 2;
      this.time.delayedCall(100, () => {
        drawPill(false);
        label.y = 0;
        if (onClick) onClick();
      });
    });

    return btnContainer;
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
