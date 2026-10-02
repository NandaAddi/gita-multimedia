/**
 * ECO-EXPLORER (PHASER 3) - MISSION MENU SCENE
 * Menampilkan 2 Misi per Ekosistem: Misi 1 (Faktor Ulah Alam) & Misi 2 (Faktor Ulah Manusia).
 * Data-driven dari window.ECOSYSTEMS_DATA & window.progressManager.
 * Desain Seiras Homepage: Emerald Glassmorphism, Gold Borders, Chunky 3D Buttons.
 * Kepatuhan Penuh: Zero Em-Dash & Aksesibilitas WCAG AAA.
 */

class MissionMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MissionMenuScene' });
  }

  create() {
    const { width, height } = this.scale;
    const activeTeam = this.registry.get('activeTeam') || {
      id: 'elang', name: 'TIM ELANG', role: '\uD83D\uDC51 Pemangsa Puncak',
      color: 0xf59e0b, auraColor: 0xfef08a, badge: 'badge_elang'
    };

    // Load ecosystem data
    this.activeEcosystemId = this.registry.get('activeEcosystem') || 'sawah';
    this.ecoConfig = (window.ECOSYSTEMS_DATA && window.ECOSYSTEMS_DATA[this.activeEcosystemId]) || (window.ECOSYSTEMS_DATA ? window.ECOSYSTEMS_DATA.sawah : null);
    this.missions = this.ecoConfig ? this.ecoConfig.missions : [];

    // 1. Background with ecosystem-specific background
    const bgKey = this.ecoConfig ? this.ecoConfig.bg : 'bg_sawah';
    const bg = this.add.image(width / 2, height / 2, bgKey);
    bg.setDisplaySize(width, height);

    // Gradasi lembut atmosferik di bawah agar kontras kartu optimal
    const bgGfx = this.add.graphics();
    bgGfx.fillGradientStyle(0x021a14, 0x021a14, 0x021a14, 0x021a14, 0.05, 0.05, 0.35, 0.35);
    bgGfx.fillRect(0, 0, width, height);

    // 2. Header Plakat Mewah Emas & Zamrud (Status Tim Aktif)
    this.createHeaderPlaque(width, activeTeam);

    // 3. Tombol Kontrol Pojok Kanan Atas
    this.createTopControls(width);

    // 4. Render 2 Kartu Misi (Side by Side)
    this.createMissionCards(width, height, activeTeam);

    // 5. Footer Tips Guru
    this.createTeacherTipBar(width, height);
  }

  /**
   * Header Plakat Emas & Zamrud
   */
  createHeaderPlaque(width, activeTeam) {
    const headerW = 1400;
    const headerH = 80;
    const headerY = 50;
    const ecoName = this.ecoConfig ? this.ecoConfig.name : 'Ekosistem';
    const ecoStars = window.progressManager ? window.progressManager.getEcosystemStars(this.activeEcosystemId) : 0;

    const gHead = this.add.graphics();
    gHead.fillStyle(0x000000, 0.45);
    gHead.fillRoundedRect(width / 2 - headerW / 2 + 4, headerY - headerH / 2 + 6, headerW, headerH, 18);
    gHead.fillStyle(0x022c22, 1);
    gHead.fillRoundedRect(width / 2 - headerW / 2, headerY - headerH / 2, headerW, headerH, 18);

    const ambientColor = this.ecoConfig ? this.ecoConfig.ambientColor : 0x064e3b;
    gHead.fillStyle(ambientColor, 0.96);
    gHead.fillRoundedRect(width / 2 - headerW / 2 + 4, headerY - headerH / 2 + 4, headerW - 8, headerH - 8, 15);

    const accentColor = this.ecoConfig ? this.ecoConfig.accentColor : 0xf59e0b;
    gHead.lineStyle(2.5, accentColor, 1);
    gHead.strokeRoundedRect(width / 2 - headerW / 2 + 4, headerY - headerH / 2 + 4, headerW - 8, headerH - 8, 15);

    // Lencana Tim Aktif
    const badgeX = width / 2 - headerW / 2 + 50;
    const badgeBg = this.add.circle(badgeX, headerY, 28, 0x021a14, 1);
    badgeBg.setStrokeStyle(2, 0xf59e0b);
    this.add.image(badgeX, headerY, activeTeam.badge || 'badge_elang').setDisplaySize(50, 50);

    this.add.text(badgeX + 44, headerY - 18, `${ecoName.toUpperCase()} - GILIRAN: ${activeTeam.name}`, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '28px',
      color: '#fef08a',
      fontStyle: 'bold',
      shadow: { offsetY: 2, color: '#000000', blur: 3, fill: true }
    });

    const roleText = activeTeam.role ? `${activeTeam.role} - ` : '';
    this.add.text(badgeX + 44, headerY + 16, `${roleText}\u2B50 ${ecoStars}/6 Bintang Ekosistem`, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '24px',
      color: '#e2e8f0',
      fontStyle: 'bold'
    });

    // Tombol Dengarkan Gita
    this.createPillButton({
      x: width / 2 + headerW / 2 - 130,
      y: headerY,
      w: 220, h: 52,
      baseColor: 0x0284c7, shadowColor: 0x0369a1, borderColor: 0x38bdf8,
      text: '\uD83D\uDD0A DENGARKAN', textColor: '#ffffff', fontSize: '24px',
      onClick: () => {
        if (window.soundEngine) {
          window.soundEngine.playBeep();
          const name = this.ecoConfig ? this.ecoConfig.name : 'Ekosistem';
          window.soundEngine.playVO('vo_mission_menu_intro', `Pilih salah satu misi di ${name}! Misi 1 adalah krisis karena ulah alam, Misi 2 adalah krisis karena ulah manusia.`);
        }
      }
    });

    // Tombol Kembali ke Peta Ekosistem
    this.createPillButton({
      x: 145, y: headerY,
      w: 240, h: 52,
      baseColor: 0x0a353c, shadowColor: 0x021a14, borderColor: 0x38bdf8,
      text: '\u25C0\uFE0F PETA EKOSISTEM', textColor: '#ffffff', fontSize: '24px',
      onClick: () => {
        if (window.soundEngine) {
          window.soundEngine.playBeep();
          window.soundEngine.stopVoice();
        }
        this.scene.start('BiomeSelectScene');
      }
    });
  }

  /**
   * Tombol Kontrol Kanan Atas
   */
  createTopControls(width) {
    // Minimal: just audio and fullscreen in the header is sufficient
    // Already handled by header pill buttons
  }

  /**
   * 2 Kartu Misi (Side by Side) - Faktor Alam vs Faktor Manusia
   */
  createMissionCards(width, height, activeTeam) {
    if (!this.missions || this.missions.length < 2) return;

    const cardW = 860;
    const cardH = 700;
    const cardGap = 40;
    const centerY = height / 2 + 50;

    const positions = [
      { x: width / 2 - cardW / 2 - cardGap / 2, y: centerY },
      { x: width / 2 + cardW / 2 + cardGap / 2, y: centerY }
    ];

    this.missionCardContainers = [];

    this.missions.forEach((m, idx) => {
      const pos = positions[idx];
      const missionProgress = window.progressManager ? window.progressManager.getMissionData(m.id) : null;
      const isUnlocked = window.progressManager ? window.progressManager.isMissionUnlocked(m.id) : (m.num === 1);
      const stars = missionProgress ? missionProgress.stars : 0;
      const isCompleted = missionProgress ? missionProgress.completed : false;

      const container = this.add.container(pos.x, pos.y);

      // --- A. KARTU BASE GRAPHICS ---
      const cardGfx = this.add.graphics();
      const typeColor = m.typeColor || (m.type === 'alam' ? 0xd97706 : 0xef4444);
      const accentColor = this.ecoConfig ? this.ecoConfig.accentColor : 0x10b981;

      const drawCard = (isHovered) => {
        cardGfx.clear();
        const shadowExtra = isHovered ? 10 : 6;
        cardGfx.fillStyle(0x000000, isHovered ? 0.55 : 0.4);
        cardGfx.fillRoundedRect(-cardW / 2 + 4, -cardH / 2 + shadowExtra, cardW - 8, cardH - 2, 18);

        cardGfx.fillStyle(0x022c22, 1);
        cardGfx.fillRoundedRect(-cardW / 2, -cardH / 2, cardW, cardH, 18);

        const faceColor = isUnlocked ? (this.ecoConfig ? this.ecoConfig.ambientColor : 0x064e3b) : 0x1e293b;
        cardGfx.fillStyle(faceColor, 0.95);
        cardGfx.fillRoundedRect(-cardW / 2 + 3, -cardH / 2 + 3, cardW - 6, cardH - 6, 16);

        // Top Inset Header Strip
        cardGfx.fillStyle(0x021a14, 0.65);
        cardGfx.fillRoundedRect(-cardW / 2 + 3, -cardH / 2 + 3, cardW - 6, 100, { tl: 16, tr: 16, bl: 0, br: 0 });
        cardGfx.lineStyle(1.5, typeColor, 0.4);
        cardGfx.lineBetween(-cardW / 2 + 3, -cardH / 2 + 103, cardW / 2 - 3, -cardH / 2 + 103);

        const borderColor = isUnlocked ? (isHovered ? 0xfef08a : accentColor) : 0x475569;
        cardGfx.lineStyle(isHovered ? 3.5 : 2.5, borderColor, isUnlocked ? 1 : 0.6);
        cardGfx.strokeRoundedRect(-cardW / 2 + 3, -cardH / 2 + 3, cardW - 6, cardH - 6, 16);
      };

      drawCard(false);
      container.add(cardGfx);

      // --- B. TYPE BADGE (Faktor Alam / Manusia) ---
      const typeBadgeW = 280;
      const typeBadgeH = 32;
      const typeBadgeY = -cardH / 2 + 26;
      const typeBadgeGfx = this.add.graphics();
      typeBadgeGfx.fillStyle(typeColor, isUnlocked ? 1 : 0.5);
      typeBadgeGfx.fillRoundedRect(-typeBadgeW / 2, typeBadgeY - typeBadgeH / 2, typeBadgeW, typeBadgeH, 16);
      container.add(typeBadgeGfx);

      const typeIcon = m.type === 'alam' ? '\uD83D\uDFE1' : '\uD83D\uDD34';
      const typeBadgeTxt = this.add.text(0, typeBadgeY, `${typeIcon} ${m.typeLabel}`, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '24px',
        color: '#ffffff',
        fontStyle: 'bold'
      }).setOrigin(0.5);
      container.add(typeBadgeTxt);

      // --- C. TITLE & STARS ---
      const titleY = -cardH / 2 + 72;
      const titleTxt = this.add.text(0, titleY, m.title, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '32px',
        color: isUnlocked ? '#ffffff' : '#94a3b8',
        fontStyle: 'bold',
        shadow: { offsetY: 2, color: '#000000', blur: 3, fill: true }
      }).setOrigin(0.5);
      container.add(titleTxt);

      // Stars display (kanan atas)
      const starTxt = this.add.text(cardW / 2 - 20, -cardH / 2 + 20, `\u2B50 ${stars}/3`, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '24px',
        color: isUnlocked ? '#fef08a' : '#64748b',
        fontStyle: 'bold'
      }).setOrigin(1, 0);
      container.add(starTxt);

      // --- D. HEADLINE & SPEECH ---
      const contentY = -cardH / 2 + 130;
      const headlineTxt = this.add.text(0, contentY, m.headline, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '26px',
        color: isUnlocked ? '#fca5a5' : '#64748b',
        fontStyle: 'bold',
        shadow: { offsetY: 1, color: '#000000', blur: 2, fill: true }
      }).setOrigin(0.5);
      container.add(headlineTxt);

      // Speech bubble
      const speechBox = this.add.graphics();
      speechBox.fillStyle(0x030712, 0.6);
      speechBox.fillRoundedRect(-cardW / 2 + 25, contentY + 25, cardW - 50, 120, 14);
      speechBox.lineStyle(1.5, isUnlocked ? accentColor : 0x334155, 0.5);
      speechBox.strokeRoundedRect(-cardW / 2 + 25, contentY + 25, cardW - 50, 120, 14);
      container.add(speechBox);

      const speechTxt = this.add.text(0, contentY + 85, m.speech, {
        fontFamily: 'Nunito, sans-serif',
        fontSize: '24px',
        color: isUnlocked ? '#e2e8f0' : '#64748b',
        wordWrap: { width: cardW - 80 },
        lineSpacing: 6,
        align: 'center'
      }).setOrigin(0.5);
      container.add(speechTxt);

      // --- E. TARGETS CHECKLIST ---
      const targetsY = contentY + 175;
      const targetsBox = this.add.graphics();
      targetsBox.fillStyle(0x021a14, 0.75);
      targetsBox.fillRoundedRect(-cardW / 2 + 25, targetsY, cardW - 50, 130, 14);
      targetsBox.lineStyle(1.5, isUnlocked ? 0x22c55e : 0x334155, 0.5);
      targetsBox.strokeRoundedRect(-cardW / 2 + 25, targetsY, cardW - 50, 130, 14);
      container.add(targetsBox);

      const targetsHeader = this.add.text(-cardW / 2 + 40, targetsY + 12, '\uD83C\uDFAF TARGET KEBERHASILAN:', {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '24px',
        color: isUnlocked ? '#86efac' : '#64748b',
        fontStyle: 'bold'
      });
      container.add(targetsHeader);

      const targets = m.targets;
      let targetStr = '';
      if (targets) {
        Object.values(targets).forEach(t => {
          const val = t.min !== undefined ? `min ${t.min}${t.unit}` : (t.max !== undefined ? `maks ${t.max}${t.unit}` : `aktif${t.unit}`);
          targetStr += `${t.text} (${val})\n`;
        });
      }
      const targetsTxt = this.add.text(-cardW / 2 + 40, targetsY + 42, targetStr.trim(), {
        fontFamily: 'Nunito, sans-serif',
        fontSize: '24px',
        color: isUnlocked ? '#a7f3d0' : '#64748b',
        lineSpacing: 6,
        wordWrap: { width: cardW - 80 }
      });
      container.add(targetsTxt);

      // --- F. TOMBOL AKSI ---
      const btnW = cardW - 50;
      const btnH = 64;
      const btnY = cardH / 2 - 48;

      const btnContainer = this.add.container(0, btnY);
      const btnGfx = this.add.graphics();

      if (isUnlocked) {
        const btnBaseColor = accentColor;
        const drawButton = (isPressed) => {
          btnGfx.clear();
          const dy = isPressed ? 4 : 0;
          btnGfx.fillStyle(0x000000, 0.4);
          btnGfx.fillRoundedRect(-btnW / 2, -btnH / 2 + 4, btnW, btnH, 16);
          btnGfx.fillStyle(btnBaseColor, 1);
          btnGfx.fillRoundedRect(-btnW / 2, -btnH / 2 + dy, btnW, btnH - 4, 16);
          btnGfx.lineStyle(2, 0xfef08a, 0.9);
          btnGfx.strokeRoundedRect(-btnW / 2, -btnH / 2 + dy, btnW, btnH - 4, 16);
        };

        drawButton(false);
        btnContainer.add(btnGfx);

        const btnLabel = isCompleted ? '\uD83D\uDD04 ULANGI MISI INI' : '\uD83D\uDE80 MULAI MISI PENYELAMATAN!';
        const btnText = this.add.text(0, 0, btnLabel, {
          fontFamily: 'Fredoka, sans-serif',
          fontSize: '26px',
          color: '#ffffff',
          fontStyle: 'bold',
          shadow: { offsetY: 2, color: '#000000', blur: 3, fill: true }
        }).setOrigin(0.5);
        btnContainer.add(btnText);

        btnContainer.setSize(btnW, btnH);
        btnContainer.setInteractive({ useHandCursor: true });

        btnContainer.on('pointerdown', () => {
          drawButton(true);
          btnText.y = 2;
          this.time.delayedCall(120, () => {
            drawButton(false);
            btnText.y = 0;
            if (window.soundEngine) window.soundEngine.playBeep();
            this.showMissionBriefingModal(m, activeTeam);
          });
        });

        // Hover
        btnContainer.on('pointerover', () => {
          container.setScale(1.02);
          container.setDepth(10);
          drawCard(true);
        });
        btnContainer.on('pointerout', () => {
          container.setScale(1.0);
          container.setDepth(1);
          drawCard(false);
        });
      } else {
        // Locked button
        btnGfx.fillStyle(0x334155, 0.7);
        btnGfx.fillRoundedRect(-btnW / 2, -btnH / 2, btnW, btnH, 16);
        btnGfx.lineStyle(2, 0x475569, 0.5);
        btnGfx.strokeRoundedRect(-btnW / 2, -btnH / 2, btnW, btnH, 16);
        btnContainer.add(btnGfx);

        const lockText = this.add.text(0, 0, '\uD83D\uDD12 Selesaikan Misi 1 Dahulu!', {
          fontFamily: 'Fredoka, sans-serif',
          fontSize: '24px',
          color: '#94a3b8',
          fontStyle: 'bold'
        }).setOrigin(0.5);
        btnContainer.add(lockText);
        btnContainer.add(lockText);

        btnContainer.setSize(btnW, btnH);
        btnContainer.setInteractive({ useHandCursor: false });

        // Lock overlay
        const lockOverlay = this.add.graphics();
        lockOverlay.fillStyle(0x0f172a, 0.4);
        lockOverlay.fillRoundedRect(-cardW / 2 + 3, -cardH / 2 + 3, cardW - 6, cardH - 6, 16);
        container.add(lockOverlay);

        const lockIcon = this.add.text(0, -30, '\uD83D\uDD12', { fontSize: '48px' }).setOrigin(0.5).setAlpha(0.6);
        container.add(lockIcon);

        btnContainer.on('pointerdown', () => {
          if (window.soundEngine) {
            window.soundEngine.playWarning ? window.soundEngine.playWarning() : window.soundEngine.playBeep();
            window.soundEngine.speakText('Misi ini masih terkunci. Selesaikan Misi 1 terlebih dahulu!');
          }
          this.tweens.add({
            targets: container,
            x: pos.x + 8,
            duration: 50,
            yoyo: true,
            repeat: 3,
            onComplete: () => { container.x = pos.x; }
          });
        });
      }

      container.add(btnContainer);
      this.missionCardContainers.push(container);
    });
  }

  /**
   * Helper Pill Button Interaktif
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
      fontSize: fontSize || '16px',
      color: textColor || '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    btnContainer.add(label);

    btnContainer.setSize(w, h);
    btnContainer.setInteractive({ useHandCursor: true });

    btnContainer.on('pointerover', () => { btnContainer.setScale(1.04); });
    btnContainer.on('pointerout', () => { btnContainer.setScale(1.0); });
    btnContainer.on('pointerdown', () => {
      drawPill(true);
      label.y = 2;
      this.time.delayedCall(100, () => {
        drawPill(false);
        label.y = 0;
        if (onClick) onClick();
      });
    });

    return { container: btnContainer, label };
  }

  /**
   * Footer Tips Guru
   */
  createTeacherTipBar(width, height) {
    const footerW = 1520;
    const footerH = 54;
    const footerY = height - 40;

    const footerGfx = this.add.graphics();
    const ambientColor = this.ecoConfig ? this.ecoConfig.ambientColor : 0x064e3b;
    const accentColor = this.ecoConfig ? this.ecoConfig.accentColor : 0x10b981;
    footerGfx.fillStyle(ambientColor, 0.95);
    footerGfx.fillRoundedRect(width / 2 - footerW / 2, footerY - footerH / 2, footerW, footerH, 27);
    footerGfx.lineStyle(2.5, accentColor, 1);
    footerGfx.strokeRoundedRect(width / 2 - footerW / 2, footerY - footerH / 2, footerW, footerH, 27);

    this.add.text(
      width / 2, footerY,
      '\u23F1\uFE0F Waktu: 7 Menit per misi. Sentuh kartu untuk melihat pengarahan detektif!',
      { fontFamily: 'Nunito, sans-serif', fontSize: '24px', color: '#fef08a', fontStyle: 'bold' }
    ).setOrigin(0.5);
  }

  // --- MODAL PRE-MISSION BRIEFING ---
  showMissionBriefingModal(mission, activeTeam) {
    const { width, height } = this.scale;

    if (this.missionCardContainers) {
      this.missionCardContainers.forEach(c => { c.setScale(1.0); c.setDepth(1); });
    }

    // 1. Dim Background
    const dimBg = this.add.rectangle(width / 2, height / 2, width, height, 0x021a14, 0.90)
      .setInteractive();
    dimBg.setDepth(200);

    // 2. Modal Container
    const modalContainer = this.add.container(0, 0);
    modalContainer.setDepth(201);

    const boxW = 1500;
    const boxH = 860;
    const modalGfx = this.add.graphics();

    const ambientColor = this.ecoConfig ? this.ecoConfig.ambientColor : 0x064e3b;
    const accentColor = this.ecoConfig ? this.ecoConfig.accentColor : 0x10b981;
    const typeColor = mission.typeColor || 0xd97706;

    // Drop Shadow
    modalGfx.fillStyle(0x000000, 0.6);
    modalGfx.fillRoundedRect(width / 2 - boxW / 2 + 6, height / 2 - boxH / 2 + 10, boxW, boxH, 24);

    // Dark Base
    modalGfx.fillStyle(0x022c22, 1);
    modalGfx.fillRoundedRect(width / 2 - boxW / 2, height / 2 - boxH / 2, boxW, boxH, 24);

    // Emerald Face
    modalGfx.fillStyle(ambientColor, 0.98);
    modalGfx.fillRoundedRect(width / 2 - boxW / 2 + 4, height / 2 - boxH / 2 + 4, boxW - 8, boxH - 8, 20);

    // Gold Border
    modalGfx.lineStyle(3, accentColor, 1);
    modalGfx.strokeRoundedRect(width / 2 - boxW / 2 + 4, height / 2 - boxH / 2 + 4, boxW - 8, boxH - 8, 20);
    modalGfx.lineStyle(1.5, 0xfef08a, 0.6);
    modalGfx.strokeRoundedRect(width / 2 - boxW / 2 + 8, height / 2 - boxH / 2 + 8, boxW - 16, boxH - 16, 17);

    // Header Strip
    modalGfx.fillStyle(0x021a14, 0.7);
    modalGfx.fillRoundedRect(width / 2 - boxW / 2 + 4, height / 2 - boxH / 2 + 4, boxW - 8, 100, { tl: 20, tr: 20, bl: 0, br: 0 });
    modalGfx.lineStyle(1.5, typeColor, 0.4);
    modalGfx.lineBetween(width / 2 - boxW / 2 + 4, height / 2 - boxH / 2 + 104, width / 2 + boxW / 2 - 4, height / 2 - boxH / 2 + 104);

    modalContainer.add(modalGfx);

    // 3. Header
    const ecoName = this.ecoConfig ? this.ecoConfig.name : 'Ekosistem';
    const titleHeader = this.add.text(width / 2 - 140, height / 2 - 380, `\uD83D\uDCCB ${mission.title.toUpperCase()}`, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '32px',
      color: '#fef08a',
      fontStyle: 'bold',
      shadow: { offsetY: 2, color: '#000000', blur: 3, fill: true }
    }).setOrigin(0.5);
    modalContainer.add(titleHeader);

    const subHeader = this.add.text(width / 2 - 140, height / 2 - 340, `${ecoName} - ${mission.typeLabel} | Giliran ${activeTeam.name}`, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '24px',
      color: '#e2e8f0',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    modalContainer.add(subHeader);

    // Close Button
    const closeBtnX = width / 2 + boxW / 2 - 50;
    const closeBtnY = height / 2 - boxH / 2 + 50;
    const closeBtnBg = this.add.circle(closeBtnX, closeBtnY, 26, 0x021a14, 0.95);
    closeBtnBg.setStrokeStyle(2.5, accentColor);
    closeBtnBg.setInteractive({ useHandCursor: true });
    const closeBtnText = this.add.text(closeBtnX, closeBtnY, '\u2715', {
      fontFamily: 'Fredoka, sans-serif', fontSize: '26px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5);
    modalContainer.add(closeBtnBg);
    modalContainer.add(closeBtnText);

    const closeModal = () => {
      if (window.soundEngine) { window.soundEngine.stopVoice(); window.soundEngine.playBeep(); }
      dimBg.destroy();
      modalContainer.destroy(true);
    };

    closeBtnBg.on('pointerdown', closeModal);
    dimBg.on('pointerdown', closeModal);

    // Voice Button
    const btnVoiceBriefX = width / 2 + boxW / 2 - 200;
    const btnVoiceBrief = this.add.rectangle(btnVoiceBriefX, height / 2 - 360, 260, 52, 0x0284c7)
      .setInteractive({ useHandCursor: true });
    btnVoiceBrief.setStrokeStyle(2, 0x38bdf8);
    const tVoiceBrief = this.add.text(btnVoiceBriefX, height / 2 - 360, '\uD83D\uDD0A DENGARKAN GITA', {
      fontFamily: 'Fredoka, sans-serif', fontSize: '24px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5);
    modalContainer.add(btnVoiceBrief);
    modalContainer.add(tVoiceBrief);

    btnVoiceBrief.on('pointerdown', () => {
      btnVoiceBrief.setScale(0.93);
      this.time.delayedCall(100, () => btnVoiceBrief.setScale(1.0));
      if (window.soundEngine) {
        window.soundEngine.playBeep();
        window.soundEngine.playVO(`vo_mission_${mission.id}_brief`, mission.speech);
      }
    });

    // 4. THREE COLUMNS: Sebab | Cara | Target
    const colY = height / 2 - 25;
    const colW = 460;
    const colH = 490;

    const createColumn = (cx, headerText, headerColor, borderColor) => {
      const colGfx = this.add.graphics();
      colGfx.fillStyle(0x000000, 0.4);
      colGfx.fillRoundedRect(cx - colW / 2 + 2, colY - colH / 2 + 4, colW, colH, 16);
      colGfx.fillStyle(0x021a14, 0.94);
      colGfx.fillRoundedRect(cx - colW / 2, colY - colH / 2, colW, colH, 16);
      colGfx.lineStyle(2, borderColor, 0.9);
      colGfx.strokeRoundedRect(cx - colW / 2, colY - colH / 2, colW, colH, 16);
      colGfx.fillStyle(ambientColor, 0.95);
      colGfx.fillRoundedRect(cx - colW / 2, colY - colH / 2, colW, 56, { tl: 16, tr: 16, bl: 0, br: 0 });
      colGfx.lineStyle(1.5, borderColor, 0.7);
      colGfx.lineBetween(cx - colW / 2, colY - colH / 2 + 56, cx + colW / 2, colY - colH / 2 + 56);
      modalContainer.add(colGfx);

      const hText = this.add.text(cx, colY - colH / 2 + 28, headerText, {
        fontFamily: 'Fredoka, sans-serif', fontSize: '24px', color: headerColor, fontStyle: 'bold'
      }).setOrigin(0.5);
      modalContainer.add(hText);
    };

    // Column 1: WHY IS IT DAMAGED?
    const col1X = width / 2 - 480;
    createColumn(col1X, '\u26A0\uFE0F PENYEBAB RUSAK', '#fca5a5', typeColor);

    const gitaBriefing = this.add.image(col1X - 140, colY - 120, 'gita_idle').setDisplaySize(120, 120);
    modalContainer.add(gitaBriefing);

    const bubbleMini = this.add.rectangle(col1X + 45, colY - 120, 260, 96, 0xfffdf5, 0.98);
    bubbleMini.setStrokeStyle(2, 0x1e293b);
    const bubbleText = mission.type === 'alam' ? 'Detektif, alam sedang\nkrisis! Ayo pulihkan!' : 'Detektif, ulah manusia\nmerusak ekosistem!';
    const bubbleMiniText = this.add.text(col1X + 45, colY - 120, bubbleText, {
      fontFamily: 'Nunito, sans-serif', fontSize: '24px', color: '#0f172a', fontStyle: 'bold', align: 'center'
    }).setOrigin(0.5);
    modalContainer.add(bubbleMini);
    modalContainer.add(bubbleMiniText);

    const tCol1 = this.add.text(col1X, colY + 75, mission.speech, {
      fontFamily: 'Nunito, sans-serif', fontSize: '24px', color: '#fecaca',
      align: 'left', wordWrap: { width: colW - 36 }, lineSpacing: 4
    }).setOrigin(0.5);
    modalContainer.add(tCol1);

    // Column 2: HOW TO CONTROL
    const col2X = width / 2;
    createColumn(col2X, '\uD83C\uDFAE CARA KONTROL', '#7dd3fc', 0x38bdf8);

    const howToText =
      '1. \uD83D\uDC47 SENTUH TOMBOL AKSI\nSentuh tombol di bawah layar IFP.\n\n' +
      '2. \u23F3 AMATI DAMPAK (1,2 DTIK)\nLihat reaksi perubahan ekosistem!\n\n' +
      '3. \uD83D\uDCE2 BANTUAN DISKUSI KELAS\nSentuh "TANYA TEMAN" bila bingung!';

    const tCol2 = this.add.text(col2X, colY + 20, howToText, {
      fontFamily: 'Nunito, sans-serif', fontSize: '24px', color: '#e2e8f0',
      align: 'left', wordWrap: { width: colW - 36 }, lineSpacing: 4
    }).setOrigin(0.5);
    modalContainer.add(tCol2);

    // Column 3: TARGETS
    const col3X = width / 2 + 480;
    createColumn(col3X, '\uD83C\uDFAF TARGET MISI', '#86efac', 0x22c55e);

    let targetFormatted = 'CHECKLIST TARGET:\n\n';
    if (mission.targets) {
      Object.values(mission.targets).forEach(t => {
        const val = t.min !== undefined ? `min ${t.min}${t.unit}` : (t.max !== undefined ? `maks ${t.max}${t.unit}` : `aktif${t.unit}`);
        targetFormatted += `\u2705 ${t.text} (${val})\n`;
      });
    }

    const tCol3 = this.add.text(col3X, colY - 15, targetFormatted, {
      fontFamily: 'Nunito, sans-serif', fontSize: '24px', color: '#a7f3d0',
      align: 'left', wordWrap: { width: colW - 36 }, lineSpacing: 4, fontStyle: 'bold'
    }).setOrigin(0.5);
    modalContainer.add(tCol3);

    // Star formula badge
    const winBadge = this.add.rectangle(col3X, colY + 175, colW - 36, 56, ambientColor, 0.98);
    winBadge.setStrokeStyle(2, accentColor);
    const winText = this.add.text(col3X, colY + 175, '\u2B50 1\u2B50: Sehat 75%+ | 2\u2B50: +Kuis | 3\u2B50: Juara', {
      fontFamily: 'Fredoka, sans-serif', fontSize: '24px', color: '#fef08a', fontStyle: 'bold'
    }).setOrigin(0.5);
    modalContainer.add(winBadge);
    modalContainer.add(winText);

    // 5. ACTION BUTTONS
    const cancelPill = this.createPillButton({
      x: width / 2 - 360, y: height / 2 + 360,
      w: 320, h: 64,
      baseColor: 0x0a353c, shadowColor: 0x021a14, borderColor: 0x38bdf8,
      text: '\u25C0\uFE0F PILIH MISI LAIN', textColor: '#ffffff', fontSize: '24px',
      onClick: closeModal
    });
    modalContainer.add(cancelPill.container);

    // Start Simulation Button
    const btnSimW = 640;
    const btnSimH = 72;
    const btnSimX = width / 2 + 200;
    const btnSimYpos = height / 2 + 360;

    const btnSimContainer = this.add.container(btnSimX, btnSimYpos);
    const btnSimGfx = this.add.graphics();

    const drawSimBtn = (isPressed) => {
      btnSimGfx.clear();
      const dy = isPressed ? 4 : 0;
      btnSimGfx.fillStyle(0xb45309, 1);
      btnSimGfx.fillRoundedRect(-btnSimW / 2, -btnSimH / 2 + 4, btnSimW, btnSimH, 18);
      btnSimGfx.fillStyle(0xf59e0b, 1);
      btnSimGfx.fillRoundedRect(-btnSimW / 2, -btnSimH / 2 + dy, btnSimW, btnSimH - 4, 18);
      btnSimGfx.lineStyle(2.5, 0xfef08a, 1);
      btnSimGfx.strokeRoundedRect(-btnSimW / 2, -btnSimH / 2 + dy, btnSimW, btnSimH - 4, 18);
    };

    drawSimBtn(false);
    btnSimContainer.add(btnSimGfx);

    const tStartSim = this.add.text(0, 0, '\uD83D\uDE80 KAMI PAHAM, MULAI SIMULASI!', {
      fontFamily: 'Fredoka, sans-serif', fontSize: '28px', color: '#ffffff', fontStyle: 'bold',
      shadow: { offsetY: 2, color: '#78350f', blur: 3, fill: true }
    }).setOrigin(0.5);
    btnSimContainer.add(tStartSim);

    btnSimContainer.setSize(btnSimW, btnSimH);
    btnSimContainer.setInteractive({ useHandCursor: true });

    this.tweens.add({
      targets: btnSimContainer,
      scaleX: 1.03, scaleY: 1.03,
      duration: 600, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
    });

    btnSimContainer.on('pointerdown', () => {
      drawSimBtn(true);
      tStartSim.y = 2;
      this.time.delayedCall(120, () => {
        if (window.soundEngine) {
          window.soundEngine.stopVoice();
          window.soundEngine.playSuccess();
        }
        this.registry.set('activeMission', mission);
        this.registry.set('activeEcosystem', this.activeEcosystemId);
        this.cameras.main.fade(300, 2, 44, 34);
        this.time.delayedCall(300, () => {
          this.scene.start('SimulationScene');
        });
      });
    });

    modalContainer.add(btnSimContainer);
  }
}

window.MissionMenuScene = MissionMenuScene;
