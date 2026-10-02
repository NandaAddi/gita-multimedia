/**
 * ECO-EXPLORER (PHASER 3) - TEAM SELECT SCENE (ARCADE CHARACTER SELECT REFACTOR)
 * Layout Pahlawan Karakter Arcade (Hero Character Select) - Audited Typography:
 * - Tipografi Terbaca Jelas (Readable IFP Standard): Huruf besar & tebal (17px - 32px), kontras tinggi WCAG AAA
 * - 5 Kartu Pahlawan Vertikal Gagah (Card Width 320px, Height 746px)
 * - Maskot Hewan Resolusi Tinggi Berukuran Besar (190x190px) dengan Animasi Napas (Breathing Idle)
 * - Lingkaran Aura Cahaya Khas & Pedestal Bayangan di Bawah Maskot
 * - Lencana Medali Emas Resmi Pahlawan Disematkan di Pojok Atas
 * - Skema Warna Unik Kontras Tiap Tim (Elang, Ular, Katak, Padi, Jamur)
 * - Header Komando Terpadu Ramping (Streamlined Plaque: Menu, Gita, Judul, Suara, Fullscreen)
 * - Tombol Taktil Chunky 3D Golden Amber dengan Feedback Sentuh Shockwave
 * - Kepatuhan Penuh: Zero Em-Dash & Aksesibilitas Layar Sentuh IFP 65-75 Inci
 */

class TeamSelectScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TeamSelectScene' });
  }

  create() {
    const { width, height } = this.scale;

    // 1. Background Sawah Modern 2D Vector Panorama 1080p
    const bg = this.add.image(width / 2, height / 2, 'bg_sawah');
    bg.setDisplaySize(width, height);

    // Gradasi lembut atmosferik: menjaga langit atas tetap cerah, memberikan bayangan teduh di bawah kartu
    const bgGfx = this.add.graphics();
    bgGfx.fillGradientStyle(0x021a14, 0x021a14, 0x021a14, 0x021a14, 0.05, 0.05, 0.40, 0.40);
    bgGfx.fillRect(0, 0, width, height);

    // 2. Header Komando Ramping Terpadu (Menu, Gita Voice, Judul, & Kontrol IFP)
    this.createStreamlinedHeader(width);

    // 3. Data 5 Tim Detektif Pahlawan Sawah (Identitas Visual Kontras & Tipografi Terbaca)
    const teams = [
      {
        id: 'elang',
        name: 'TIM ELANG',
        roleTag: '👑 KONSUMEN PUNCAK',
        role: '👑 Konsumen Puncak',
        motto: 'Penjaga Langit Sawah',
        biomeRole: 'Elang • Harimau • Bangau • Hiu',
        mascot: 'elang',
        mascotScale: 1.05,
        missionId: 1,
        missionLabel: '👑 Puncak 4 Bioma',
        badge: 'badge_elang',
        accentColor: 0xf59e0b,      // Amber Gold
        badgeColor: 0xef4444,       // Crimson
        cardBaseColor: 0x2b060d,    // Deep Crimson Enamel
        cardFaceColor: 0x3d0b16,    // Rich Wine
        auraColor: 0xfca5a5,        // Soft Red Glow
        btnBaseColor: 0xb45309,
        btnFaceColor: 0xf59e0b
      },
      {
        id: 'ular',
        name: 'TIM ULAR',
        roleTag: '🛡️ PENGENDALI HAMA',
        role: '🛡️ Pemburu Hama',
        motto: 'Sahabat Pemburu Hama',
        biomeRole: 'Ular • Rusa • Ikan Tawar • Ikan Karang',
        mascot: 'ular',
        mascotScale: 1.0,
        missionId: 1,
        missionLabel: '🛡️ Pengendali 4 Bioma',
        badge: 'badge_ular',
        accentColor: 0x10b981,      // Emerald Green
        badgeColor: 0x059669,
        cardBaseColor: 0x022019,    // Deep Forest Emerald
        cardFaceColor: 0x064e3b,    // Jade Green
        auraColor: 0xa7f3d0,        // Soft Emerald Glow
        btnBaseColor: 0x047857,
        btnFaceColor: 0x10b981
      },
      {
        id: 'katak',
        name: 'TIM KATAK',
        roleTag: '🦗 PEMANGSA SERANGGA',
        role: '🦗 Pemakan Serangga',
        motto: 'Penjaga Sawah dari Wereng',
        biomeRole: 'Katak • Serangga • Benih • Penyu',
        mascot: 'katak',
        mascotScale: 0.95,
        missionId: 2,
        missionLabel: '🦗 Pemangsa 4 Bioma',
        badge: 'badge_katak',
        accentColor: 0x84cc16,      // Lime Green
        badgeColor: 0x65a30d,
        cardBaseColor: 0x11290b,    // Deep Jungle Moss
        cardFaceColor: 0x1c4413,    // Spring Forest
        auraColor: 0xd9f99d,        // Soft Lime Glow
        btnBaseColor: 0x4d7c0f,
        btnFaceColor: 0x84cc16
      },
      {
        id: 'padi',
        name: 'TIM PADI',
        roleTag: '🌾 SUMBER ENERGI',
        role: '🌾 Produsen Utama',
        motto: 'Pemberi Energi Utama',
        biomeRole: 'Padi • Pohon Rimba • Teratai • Karang',
        mascot: 'padi_subur',
        mascotScale: 1.05,
        missionId: 3,
        missionLabel: '🌾 Produsen 4 Bioma',
        badge: 'badge_padi',
        accentColor: 0xf59e0b,      // Golden Harvest
        badgeColor: 0xd97706,
        cardBaseColor: 0x2b1c03,    // Deep Warm Honey
        cardFaceColor: 0x452305,    // Harvest Ochre
        auraColor: 0xfef08a,        // Golden Sun Glow
        btnBaseColor: 0xb45309,
        btnFaceColor: 0xf59e0b
      },
      {
        id: 'jamur',
        name: 'TIM JAMUR',
        roleTag: '🍄 PENYUBUR TANAH',
        role: '🍄 Ahli Pengurai',
        motto: 'Penyubur Tanah Alami',
        biomeRole: 'Jamur • Pengurai Rimba • Bakteri • Detritivor',
        mascot: 'jamur',
        mascotScale: 1.0,
        missionId: 4,
        missionLabel: '🍄 Pengurai 4 Bioma',
        badge: 'badge_jamur',
        accentColor: 0xc084fc,      // Mystic Violet
        badgeColor: 0x9333ea,
        cardBaseColor: 0x1e0e2d,    // Deep Mystic Indigo
        cardFaceColor: 0x3b1154,    // Royal Purple
        auraColor: 0xf3e8ff,        // Soft Violet Glow
        btnBaseColor: 0x7e22ce,
        btnFaceColor: 0xa855f7
      }
    ];

    let classSession = this.registry.get('classSession');
    if (!classSession) {
      classSession = { completedMissions: {} };
      this.registry.set('classSession', classSession);
    }

    // 4. Render 5 Kartu Pahlawan Arcade (Hero Character Roster)
    this.createHeroTeamCards(width, height, teams, classSession);

    // 5. Footer Tips Guru Ramah Siswa
    this.createTeacherTipBar(width, height);
  }

  /**
   * Header Komando Terpadu Ramping (Streamlined Plaque)
   * Menyatukan Navigasi, Gita Avatar & Speech, Judul Game, dan Kontrol IFP
   */
  createStreamlinedHeader(width) {
    const headerW = 1840;
    const headerH = 80;
    const headerY = 54;

    const headerLeft = width / 2 - headerW / 2;
    const headerRight = width / 2 + headerW / 2;

    const gHead = this.add.graphics();
    // Drop shadow
    gHead.fillStyle(0x000000, 0.45);
    gHead.fillRoundedRect(headerLeft + 4, headerY - headerH / 2 + 6, headerW, headerH, 18);

    // Dark Enamel Base
    gHead.fillStyle(0x021a14, 1);
    gHead.fillRoundedRect(headerLeft, headerY - headerH / 2, headerW, headerH, 18);

    // Emerald Face Glassmorphism
    gHead.fillStyle(0x064e3b, 0.96);
    gHead.fillRoundedRect(headerLeft + 4, headerY - headerH / 2 + 4, headerW - 8, headerH - 8, 15);

    // Polished Golden Border
    gHead.lineStyle(2.5, 0xf59e0b, 1);
    gHead.strokeRoundedRect(headerLeft + 4, headerY - headerH / 2 + 4, headerW - 8, headerH - 8, 15);

    // Inner gold hairline
    gHead.lineStyle(1, 0xfef08a, 0.4);
    gHead.strokeRoundedRect(headerLeft + 7, headerY - headerH / 2 + 7, headerW - 14, headerH - 14, 12);

    // --- A. Tombol Menu Utama di Kiri (Anchor Aman dari Margin Kiri Panel) ---
    const innerLeft = headerLeft + 20;
    const wMenu = 190;
    const xMenu = innerLeft + wMenu / 2;
    this.createPillButton({
      x: xMenu,
      y: headerY,
      w: wMenu,
      h: 52,
      baseColor: 0x0a353c,
      shadowColor: 0x021a14,
      borderColor: 0x38bdf8,
      text: '◀ MENU UTAMA',
      textColor: '#ffffff',
      fontSize: '24px',
      onClick: () => {
        if (window.soundEngine) window.soundEngine.playBeep();
        this.scene.start('TitleScene');
      }
    });

    // --- B. Avatar & Balon Bicara Gita ---
    const avatarR = 28;
    const gitaX = xMenu + wMenu / 2 + 16 + avatarR;

    const avatarBg = this.add.circle(gitaX, headerY, avatarR, 0x021a14, 1);
    avatarBg.setStrokeStyle(2, 0xf59e0b);

    const circleMaskGfx = this.make.graphics();
    circleMaskGfx.fillCircle(gitaX, headerY, avatarR - 2);
    const avatarMask = circleMaskGfx.createGeometryMask();

    const gitaImg = this.add.image(gitaX, headerY + 14, 'gita_talk');
    gitaImg.setDisplaySize(96, 96);
    gitaImg.setMask(avatarMask);

    this.tweens.add({
      targets: [avatarBg, gitaImg],
      y: '-=3',
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Kotak dialog ringkas Gita
    const speechW = 460;
    const speechH = 64;
    const speechX = gitaX + avatarR + 12 + speechW / 2;

    const speechGfx = this.add.graphics();
    speechGfx.fillStyle(0x022c22, 0.95);
    speechGfx.fillRoundedRect(speechX - speechW / 2, headerY - speechH / 2, speechW, speechH, 16);
    speechGfx.lineStyle(1.5, 0x10b981, 0.9);
    speechGfx.strokeRoundedRect(speechX - speechW / 2, headerY - speechH / 2, speechW, speechH, 16);

    const textLeftX = speechX - speechW / 2 + 16;
    this.add.text(textLeftX, headerY - 14, '🔍 GITA (PANDUAN SISWA):', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '24px',
      color: '#fef08a',
      fontStyle: 'bold'
    }).setOrigin(0, 0.5);

    this.add.text(textLeftX, headerY + 14, 'Pilih pahlawan timmu untuk mulai!', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '24px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0, 0.5);

    // Tombol Dengarkan Gita
    const wListen = 170;
    const xListen = speechX + speechW / 2 + 14 + wListen / 2;
    this.createPillButton({
      x: xListen,
      y: headerY,
      w: wListen,
      h: 52,
      baseColor: 0x0284c7,
      shadowColor: 0x0369a1,
      borderColor: 0x38bdf8,
      text: '🔊 DENGARKAN',
      textColor: '#ffffff',
      fontSize: '24px',
      onClick: () => {
        if (window.soundEngine) {
          window.soundEngine.playBeep();
          window.soundEngine.playVO('vo_team_intro', 'Selamat datang, detektif cilik! Kelompok mana yang maju pertama? Sentuh lencana timmu!');
        }
      }
    });

    // --- D. Kontrol Kanan Atas (Suara & Fullscreen) ---
    const innerRight = headerRight - 20;
    const ctrlGap = 12;

    // Tombol Fullscreen (Paling Kanan)
    const wFullscreen = 150;
    const xFullscreen = innerRight - wFullscreen / 2;
    this.createPillButton({
      x: xFullscreen,
      y: headerY,
      w: wFullscreen,
      h: 52,
      baseColor: 0x0a353c,
      shadowColor: 0x021a14,
      borderColor: 0x38bdf8,
      text: '⛶ Layar',
      textColor: '#ffffff',
      fontSize: '24px',
      onClick: () => {
        if (window.soundEngine) window.soundEngine.playBeep();
        if (this.scale.isFullscreen) {
          this.scale.stopFullscreen();
        } else {
          this.scale.startFullscreen();
        }
      }
    });

    // Tombol Suara
    const wAudio = 125;
    const xAudio = (xFullscreen - wFullscreen / 2) - ctrlGap - wAudio / 2;
    const isMutedInit = window.soundEngine ? window.soundEngine.muted : false;
    const audioBtn = this.createPillButton({
      x: xAudio,
      y: headerY,
      w: wAudio,
      h: 52,
      baseColor: 0x0a353c,
      shadowColor: 0x021a14,
      borderColor: 0x38bdf8,
      text: isMutedInit ? '🔇 Bisu' : '🔊 Suara',
      textColor: '#ffffff',
      fontSize: '24px',
      onClick: () => {
        if (window.soundEngine) {
          const isMuted = window.soundEngine.toggleMute();
          audioBtn.label.setText(isMuted ? '🔇 Bisu' : '🔊 Suara');
          if (!isMuted) window.soundEngine.playBeep();
        }
      }
    });

    // --- C. Plakat Judul Tengah Gagah ---
    const leftBoundTitle = xListen + wListen / 2;
    const rightBoundTitle = xAudio - wAudio / 2;
    const titleX = (leftBoundTitle + rightBoundTitle) / 2;

    this.add.text(titleX, headerY - 14, '🏆 PILIH TIM DETEKTIF SAWAH 🌾', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '28px',
      color: '#fef08a',
      fontStyle: 'bold',
      shadow: { offsetY: 2, color: '#000000', blur: 4, fill: true }
    }).setOrigin(0.5);

    this.add.text(titleX, headerY + 16, '🎮 Wakil kelompok maju dan sentuh pahlawan timmu!', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '24px',
      color: '#e2e8f0',
      fontStyle: 'bold'
    }).setOrigin(0.5);
  }

  /**
   * 5 Kartu Pahlawan Arcade (Hero Character Roster)
   * Menampilkan Maskot Hewan Besar, Pedestal Aura, Lencana Medali Emas, dan Tombol Taktil 3D
   */
  createHeroTeamCards(width, height, teams, classSession) {
    const cardW = 320;
    const cardH = 746;
    const cardY = 566;
    const centers = [220, 590, 960, 1330, 1700];

    teams.forEach((t, i) => {
      const cx = centers[i];
      const container = this.add.container(cx, cardY);

      // --- A. GRAPHICS DASAR KARTU HERO ---
      const cardGfx = this.add.graphics();

      const drawCard = (isHovered) => {
        cardGfx.clear();
        const shadowDy = isHovered ? 12 : 8;

        // 3D Drop Shadow
        cardGfx.fillStyle(0x000000, isHovered ? 0.60 : 0.45);
        cardGfx.fillRoundedRect(-cardW / 2 + 4, -cardH / 2 + shadowDy, cardW - 8, cardH - 4, 20);

        // Enamel Base Kontras Khas Tim
        cardGfx.fillStyle(t.cardBaseColor, 1);
        cardGfx.fillRoundedRect(-cardW / 2, -cardH / 2, cardW, cardH, 20);

        // Card Face Gradient/Color
        cardGfx.fillStyle(t.cardFaceColor, 0.97);
        cardGfx.fillRoundedRect(-cardW / 2 + 3, -cardH / 2 + 3, cardW - 6, cardH - 6, 18);

        // Top Header Strip (Tempat Nama & Lencana)
        cardGfx.fillStyle(0x021a14, 0.75);
        cardGfx.fillRoundedRect(-cardW / 2 + 3, -cardH / 2 + 3, cardW - 6, 142, { tl: 18, tr: 18, bl: 0, br: 0 });

        // Garis Pembatas Header Emas Tipis
        cardGfx.lineStyle(1.5, t.accentColor, 0.5);
        cardGfx.lineBetween(-cardW / 2 + 3, -cardH / 2 + 145, cardW / 2 - 3, -cardH / 2 + 145);

        // Border Garis Emas Berkilau / Neon Tim
        const borderColor = isHovered ? 0xfef08a : t.accentColor;
        cardGfx.lineStyle(isHovered ? 3.5 : 2.5, borderColor, 1);
        cardGfx.strokeRoundedRect(-cardW / 2 + 3, -cardH / 2 + 3, cardW - 6, cardH - 6, 18);

        // Hairline dalam mewah
        cardGfx.lineStyle(1, 0xfef08a, isHovered ? 0.6 : 0.25);
        cardGfx.strokeRoundedRect(-cardW / 2 + 6, -cardH / 2 + 6, cardW - 12, cardH - 12, 16);
      };

      drawCard(false);
      container.add(cardGfx);

      // --- B. STATUS SELESAI (Gold Star Success Pill) ---
      if (classSession.completedMissions[t.missionId]) {
        const doneGfx = this.add.graphics();
        doneGfx.fillStyle(0x166534, 1);
        doneGfx.fillRoundedRect(-cardW / 2 + 14, -cardH / 2 + 10, 134, 34, 17);
        doneGfx.fillStyle(0x22c55e, 1);
        doneGfx.fillRoundedRect(-cardW / 2 + 14, -cardH / 2 + 8, 134, 32, 16);
        container.add(doneGfx);

        const doneText = this.add.text(-cardW / 2 + 81, -cardH / 2 + 24, '⭐ SELESAI', {
          fontFamily: 'Fredoka, sans-serif',
          fontSize: '24px',
          color: '#ffffff',
          fontStyle: 'bold'
        }).setOrigin(0.5);
        container.add(doneText);
      }

      // --- C. LENCANA MEDALI RESMI (Di Pojok Kanan Atas Kartu) ---
      const badgeX = cardW / 2 - 46;
      const badgeY = -cardH / 2 + 48;

      const badgeGlow = this.add.circle(badgeX, badgeY, 34, t.accentColor, 0.35);
      container.add(badgeGlow);

      const badgeImg = this.add.image(badgeX, badgeY, t.badge);
      badgeImg.setDisplaySize(72, 72);
      container.add(badgeImg);

      // --- D. IDENTITAS TIM (Nama & Motto) ---
      const tagBg = this.add.graphics();
      tagBg.fillStyle(0x021a14, 0.7);
      tagBg.fillRoundedRect(-cardW / 2 + 14, -cardH / 2 + 14, 205, 34, 8);
      tagBg.lineStyle(1, t.accentColor, 0.6);
      tagBg.strokeRoundedRect(-cardW / 2 + 14, -cardH / 2 + 14, 205, 34, 8);
      container.add(tagBg);

      const tagText = this.add.text(-cardW / 2 + 22, -cardH / 2 + 19, t.roleTag, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '24px',
        color: '#fef08a',
        fontStyle: 'bold'
      });
      container.add(tagText);

      const nameText = this.add.text(0, -cardH / 2 + 82, t.name, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '34px',
        color: '#ffffff',
        fontStyle: 'bold',
        shadow: { offsetY: 2, color: '#000000', blur: 5, fill: true }
      }).setOrigin(0.5);
      container.add(nameText);

      const mottoText = this.add.text(0, -cardH / 2 + 118, `"${t.motto}"`, {
        fontFamily: 'Nunito, sans-serif',
        fontSize: '24px',
        color: '#fde68a',
        fontStyle: 'bold'
      }).setOrigin(0.5);
      container.add(mottoText);

      // --- E. PANGGUNG MASKOT HEWAN BESAR (Hero Mascot Showcase) ---
      const mascotCenterY = -cardH / 2 + 282;

      // Radial Aura tim di belakang hewan
      const auraCircle = this.add.circle(0, mascotCenterY, 98, t.auraColor, 0.22);
      container.add(auraCircle);

      // Bayangan pijakan di bawah hewan (Pedestal Shadow)
      const pedestalShadow = this.add.ellipse(0, mascotCenterY + 88, 175, 24, 0x000000, 0.40);
      container.add(pedestalShadow);

      // Sprite Kartun Hewan Pahlawan Besar
      const mascotImg = this.add.image(0, mascotCenterY, t.mascot);
      const targetSize = Math.round(185 * (t.mascotScale || 1.0));
      mascotImg.setDisplaySize(targetSize, targetSize);
      container.add(mascotImg);

      // Animasi Napas Pahlawan (Idle Breathing Yoyo Tween)
      this.tweens.add({
        targets: [mascotImg, auraCircle],
        y: mascotCenterY - 8,
        duration: 1400 + i * 140,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });

      // --- F. KAPSUL PERAN EKOLOGIS & SPESIALIS MISI ---
      // 1. Kapsul Peran
      const roleY = -cardH / 2 + 440;
      const roleGfx = this.add.graphics();
      roleGfx.fillStyle(0x021a14, 0.88);
      roleGfx.fillRoundedRect(-146, roleY - 30, 292, 60, 14);
      roleGfx.lineStyle(1.5, t.accentColor, 0.9);
      roleGfx.strokeRoundedRect(-146, roleY - 30, 292, 60, 14);
      container.add(roleGfx);

      const roleText = this.add.text(0, roleY - 12, t.role, {
        fontFamily: 'Nunito, sans-serif',
        fontSize: '24px',
        color: '#ffffff',
        fontStyle: 'bold'
      }).setOrigin(0.5);

      const subRoleText = this.add.text(0, roleY + 14, t.biomeRole || '', {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '24px',
        color: '#fef08a'
      }).setOrigin(0.5);
      container.add([roleText, subRoleText]);

      // 2. Kapsul Misi
      const missionY = -cardH / 2 + 515;
      const missionGfx = this.add.graphics();
      missionGfx.fillStyle(0x082f49, 0.88);
      missionGfx.fillRoundedRect(-146, missionY - 26, 292, 52, 14);
      missionGfx.lineStyle(1.5, 0x38bdf8, 0.85);
      missionGfx.strokeRoundedRect(-146, missionY - 26, 292, 52, 14);
      container.add(missionGfx);

      const missionText = this.add.text(0, missionY, t.missionLabel, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '24px',
        color: '#7dd3fc',
        fontStyle: 'bold'
      }).setOrigin(0.5);
      container.add(missionText);

      // --- G. TOMBOL CHUNKY 3D "👉 PILIH TIM INI!" ---
      const btnW = 282;
      const btnH = 68;
      const btnY = cardH / 2 - 50;

      const btnContainer = this.add.container(0, btnY);
      const btnGfx = this.add.graphics();

      const drawButton = (isPressed) => {
        btnGfx.clear();
        const dy = isPressed ? 4 : 0;
        // Bottom 3D bevel shadow
        btnGfx.fillStyle(t.btnBaseColor || 0xb45309, 1);
        btnGfx.fillRoundedRect(-btnW / 2, -btnH / 2 + 5, btnW, btnH, 16);

        // Front Face
        btnGfx.fillStyle(t.btnFaceColor || 0xf59e0b, 1);
        btnGfx.fillRoundedRect(-btnW / 2, -btnH / 2 + dy, btnW, btnH - 5, 16);

        // Highlight line
        btnGfx.lineStyle(2, 0xfef08a, 0.9);
        btnGfx.strokeRoundedRect(-btnW / 2, -btnH / 2 + dy, btnW, btnH - 5, 16);
      };

      drawButton(false);
      btnContainer.add(btnGfx);

      const btnText = this.add.text(0, 0, '👉 PILIH TIM INI!', {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '28px',
        color: '#ffffff',
        fontStyle: 'bold',
        shadow: { offsetY: 2, color: '#78350f', blur: 3, fill: true }
      }).setOrigin(0.5);
      btnContainer.add(btnText);

      btnContainer.setSize(btnW, btnH);
      btnContainer.setInteractive({ useHandCursor: true });

      // Efek Interaktif Hover Kartu & Tombol
      const onHoverCard = () => {
        container.setScale(1.03);
        container.setDepth(15);
        drawCard(true);
        auraCircle.setAlpha(0.48);
        badgeGlow.setAlpha(0.65);
        if (window.soundEngine) window.soundEngine.playBeep();
      };

      const onOutCard = () => {
        container.setScale(1.0);
        container.setDepth(1);
        drawCard(false);
        auraCircle.setAlpha(0.22);
        badgeGlow.setAlpha(0.35);
      };

      btnContainer.on('pointerover', onHoverCard);
      btnContainer.on('pointerout', onOutCard);

      // Sentuhan Eksekusi Pemilihan Tim
      btnContainer.on('pointerdown', () => {
        drawButton(true);
        btnText.y = 3;

        // Efek visual Shockwave Ring melingkar
        const ring = this.add.circle(cx, cardY + btnY, 40, 0xfef08a, 0.8);
        ring.setDepth(50);
        this.tweens.add({
          targets: ring,
          scale: 4.5,
          alpha: 0,
          duration: 450,
          ease: 'Cubic.easeOut',
          onComplete: () => ring.destroy()
        });

        if (window.soundEngine) {
          window.soundEngine.playSuccess();
        }

        this.time.delayedCall(150, () => {
          this.registry.set('activeTeam', t);
          this.registry.set('assignedMissionId', t.missionId);
          this.registry.set('activeEcosystem', 'sawah');

          if (window.soundEngine) {
            window.soundEngine.playVO('vo_team_selected', 'Pilihan hebat! Tim detektif sudah siap. Ayo jelajahi ekosistem Nusantara!');
          }

          // Transisi sinematik halus ke BiomeSelectScene
          this.cameras.main.fade(300, 2, 44, 34);
          this.time.delayedCall(300, () => {
            this.scene.start('BiomeSelectScene');
          });
        });
      });

      btnContainer.on('pointerup', () => {
        drawButton(false);
        btnText.y = 0;
      });

      container.add(btnContainer);
    });
  }

  /**
   * Helper Pill Button Interaktif Seiras Homepage
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
   * Footer Tips Guru Seiras Homepage
   */
  createTeacherTipBar(width, height) {
    const footerW = 1580;
    const footerH = 56;
    const footerY = height - 32;

    const footerGfx = this.add.graphics();
    footerGfx.fillStyle(0x064e3b, 0.95);
    footerGfx.fillRoundedRect(width / 2 - footerW / 2, footerY - footerH / 2, footerW, footerH, 28);
    footerGfx.lineStyle(2, 0x10b981, 1);
    footerGfx.strokeRoundedRect(width / 2 - footerW / 2, footerY - footerH / 2, footerW, footerH, 28);

    this.add.text(
      width / 2,
      footerY,
      '💡 Tips Guru: Tiap kelompok maju sekitar 7 menit. Siswa di meja kelas berperan aktif sebagai Penasihat Meja!',
      {
        fontFamily: 'Nunito, sans-serif',
        fontSize: '24px',
        color: '#fef08a',
        fontStyle: 'bold'
      }
    ).setOrigin(0.5);
  }
}

window.TeamSelectScene = TeamSelectScene;
