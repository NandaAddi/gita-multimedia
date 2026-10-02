/**
 * ECO-EXPLORER (PHASER 3) - TEAM SELECT SCENE
 * Master Arcade Hero Character Select Slider (Format Panggung Karakter Tunggal Megah):
 * - 1 Hero Tampil Besar di Panggung Pusat (Maskot 280px + Pedestal 3D + Aura Bercahaya)
 * - Bilah Navigasi 2-Zona Bebas Tabrakan: Header Komando Ramping + Judul Layar Terpisah
 * - Panggung Informasi Seimbang: Kiri (Maskot & Status) | Kanan (Lencana, Peran Sains, Misi, & Tombol Aksi)
 * - Sistem Navigasi Hibrida: Tombol Panah Arkade Samping (◀ / ▶) + Dok 5 Ubin Selektor + Touch Swipe
 * - Standar Tipografi Ultra-Large IFP (Seluruh font >= 24px, zero text overflow, zero clipping)
 * - 100% Offline & Kompatibel Protokol file:// (Bebas CORS)
 */

class TeamSelectScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TeamSelectScene' });
  }

  create() {
    const { width, height } = this.scale;

    // 1. Background Panorama Sawah 1080p dengan Tint Lembut
    const bg = this.add.image(width / 2, height / 2, 'bg_sawah');
    bg.setDisplaySize(width, height);

    const bgGfx = this.add.graphics();
    bgGfx.fillGradientStyle(0x021a14, 0x021a14, 0x021a14, 0x021a14, 0.08, 0.08, 0.45, 0.45);
    bgGfx.fillRect(0, 0, width, height);

    // 2. Data 5 Tim Detektif Pahlawan Sawah
    this.teams = [
      {
        id: 'elang',
        name: 'TIM ELANG',
        roleTag: '👑 KONSUMEN PUNCAK',
        role: '👑 Pemangsa Puncak Rantai Makanan',
        motto: 'Penjaga Langit Sawah',
        biomeRole: 'Elang • Harimau • Bangau • Hiu',
        desc: 'Memangsa ular dan mengontrol rantai makanan dari udara agar ekosistem tetap seimbang.',
        mascot: 'elang',
        mascotScale: 1.05,
        missionId: 1,
        missionLabel: 'Puncak 4 Ekosistem',
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
        role: '🛡️ Pemburu Hama Alami',
        motto: 'Sahabat Pemburu Hama',
        biomeRole: 'Ular • Rusa • Ikan Tawar • Ikan Karang',
        desc: 'Berpatroli di pematang sawah memburu tikus agar rumpun padi tidak habis dirusak.',
        mascot: 'ular',
        mascotScale: 1.0,
        missionId: 1,
        missionLabel: 'Pengendali 4 Ekosistem',
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
        role: '🦗 Pemangsa Serangga Sawah',
        motto: 'Penjaga Padi dari Wereng',
        biomeRole: 'Katak • Serangga • Benih • Penyu',
        desc: 'Melompat di sela tanaman memakan wereng cokelat dan serangga perusak daun padi.',
        mascot: 'katak',
        mascotScale: 0.95,
        missionId: 2,
        missionLabel: 'Pemangsa 4 Ekosistem',
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
        role: '🌾 Produsen Utama Ekosistem',
        motto: 'Pemberi Energi Utama',
        biomeRole: 'Padi • Pohon Rimba • Teratai • Karang',
        desc: 'Menyerap air dan sinar matahari untuk menghasilkan bulir padi makanan seluruh makhluk hidup.',
        mascot: 'padi_subur',
        mascotScale: 1.05,
        missionId: 3,
        missionLabel: 'Produsen 4 Ekosistem',
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
        role: '🍄 Ahli Dekomposer Alami',
        motto: 'Penyubur Tanah Alami',
        biomeRole: 'Jamur • Pengurai Rimba • Bakteri',
        desc: 'Mengurai sisa jerami dan bangkai hewan menjadi zat hara pupuk kompos alami penyubur tanah.',
        mascot: 'jamur',
        mascotScale: 1.0,
        missionId: 4,
        missionLabel: 'Pengurai 4 Ekosistem',
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

    // Indeks tim yang sedang aktif ditampilkan di panggung utama
    const activeTeamSaved = this.registry.get('activeTeam');
    let initIndex = 0;
    if (activeTeamSaved && activeTeamSaved.id) {
      const foundIdx = this.teams.findIndex(t => t.id === activeTeamSaved.id);
      if (foundIdx >= 0) initIndex = foundIdx;
    }
    this.currentTeamIndex = initIndex;

    this.classSession = this.registry.get('classSession') || { completedMissions: {} };

    // 3. Bilah Navigasi Atas Ramping (Bebas Tabrakan)
    this.createStreamlinedHeader(width);

    // 4. Plakat Judul Layar Mandiri
    this.createScreenTitle(width);

    // 5. Wadah Container Panggung Utama
    this.stageContainer = this.add.container(0, 0);

    // 6. Tombol Navigasi Samping & Gestur Sentuh
    this.createNavigationControls(width, height);

    // 7. Dok Miniatur 5 Tim di Kuadran Bawah
    this.createBottomHeroDock(width, height);

    // 8. Footer Tips Guru
    this.createTeacherTipBar(width, height);

    // 9. Tampilkan Hero Pertama
    this.updateHeroView(false);
  }

  /**
   * Bilah Header Atas Ramping (Navigasi, Gita Guide, dan Utility IFP)
   */
  createStreamlinedHeader(width) {
    const headerW = 1840;
    const headerH = 68;
    const headerY = 46;

    const headerLeft = width / 2 - headerW / 2;
    const headerRight = width / 2 + headerW / 2;

    const gHead = this.add.graphics();
    // Drop shadow
    gHead.fillStyle(0x000000, 0.45);
    gHead.fillRoundedRect(headerLeft + 4, headerY - headerH / 2 + 5, headerW, headerH, 16);

    // Dark Enamel Base
    gHead.fillStyle(0x021a14, 1);
    gHead.fillRoundedRect(headerLeft, headerY - headerH / 2, headerW, headerH, 16);

    // Emerald Face
    gHead.fillStyle(0x064e3b, 0.96);
    gHead.fillRoundedRect(headerLeft + 3, headerY - headerH / 2 + 3, headerW - 6, headerH - 6, 14);

    // Polished Gold Border
    gHead.lineStyle(2.5, 0xf59e0b, 1);
    gHead.strokeRoundedRect(headerLeft + 3, headerY - headerH / 2 + 3, headerW - 6, headerH - 6, 14);

    // --- A. Tombol Menu Utama di Kiri ---
    const wMenu = 190;
    const xMenu = headerLeft + 18 + wMenu / 2;
    this.createPillButton({
      x: xMenu,
      y: headerY,
      w: wMenu,
      h: 48,
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

    // --- B. Avatar & Sapaan Pemandu Gita ---
    const avatarR = 26;
    const gitaX = xMenu + wMenu / 2 + 20 + avatarR;

    const avatarBg = this.add.circle(gitaX, headerY, avatarR, 0x021a14, 1);
    avatarBg.setStrokeStyle(2, 0xf59e0b);

    const circleMaskGfx = this.make.graphics();
    circleMaskGfx.fillCircle(gitaX, headerY, avatarR - 2);
    const avatarMask = circleMaskGfx.createGeometryMask();

    const gitaImg = this.add.image(gitaX, headerY + 12, 'gita_talk');
    gitaImg.setDisplaySize(88, 88);
    gitaImg.setMask(avatarMask);

    this.tweens.add({
      targets: [avatarBg, gitaImg],
      y: '-=3',
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Speech Box Ringkas Gita
    const speechW = 750;
    const speechH = 50;
    const speechX = gitaX + avatarR + 14 + speechW / 2;

    const speechGfx = this.add.graphics();
    speechGfx.fillStyle(0x022c22, 0.95);
    speechGfx.fillRoundedRect(speechX - speechW / 2, headerY - speechH / 2, speechW, speechH, 14);
    speechGfx.lineStyle(1.5, 0x10b981, 0.9);
    speechGfx.strokeRoundedRect(speechX - speechW / 2, headerY - speechH / 2, speechW, speechH, 14);

    this.add.text(speechX, headerY, '👧 GITA: Sentuh pahlawan timmu untuk mulai bertualang!', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '24px',
      color: '#fef08a',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Tombol Suara Gita
    const wListen = 195;
    const xListen = speechX + speechW / 2 + 16 + wListen / 2;
    this.createPillButton({
      x: xListen,
      y: headerY,
      w: wListen,
      h: 48,
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

    // --- C. Kontrol Kanan (Suara & Fullscreen) ---
    const innerRight = headerRight - 18;

    // Tombol Fullscreen (Paling Kanan)
    const wFullscreen = 150;
    const xFullscreen = innerRight - wFullscreen / 2;
    this.createPillButton({
      x: xFullscreen,
      y: headerY,
      w: wFullscreen,
      h: 48,
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
    const wAudio = 130;
    const xAudio = (xFullscreen - wFullscreen / 2) - 14 - wAudio / 2;
    const isMutedInit = window.soundEngine ? window.soundEngine.muted : false;
    const audioBtn = this.createPillButton({
      x: xAudio,
      y: headerY,
      w: wAudio,
      h: 48,
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
  }

  /**
   * Plakat Judul Layar Mandiri yang Bersih & Elegan
   */
  createScreenTitle(width) {
    const titleY = 118;
    const plateW = 1060;
    const plateH = 82;
    const plateY = titleY + 18;

    const plateGfx = this.add.graphics();
    plateGfx.fillStyle(0x021a14, 0.72);
    plateGfx.fillRoundedRect(width / 2 - plateW / 2, plateY - plateH / 2, plateW, plateH, 18);
    plateGfx.lineStyle(1.5, 0x10b981, 0.6);
    plateGfx.strokeRoundedRect(width / 2 - plateW / 2, plateY - plateH / 2, plateW, plateH, 18);

    this.add.text(width / 2, titleY, '🏆 PILIH TIM DETEKTIF SAWAH 🌾', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '36px',
      color: '#fef08a',
      fontStyle: 'bold',
      shadow: { offsetY: 2, color: '#000000', blur: 4, fill: true }
    }).setOrigin(0.5);

    this.add.text(width / 2, titleY + 36, '🎮 Wakil kelompok maju ke layar IFP dan sentuh pahlawan timmu!', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '24px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
  }

  /**
   * Render Panggung Pahlawan Utama (Hero Character Stage)
   */
  updateHeroView(isAnimated = true) {
    const { width } = this.scale;
    const t = this.teams[this.currentTeamIndex];

    this.stageContainer.removeAll(true);

    const stageW = 1280;
    const stageH = 550;
    const stageX = width / 2;
    const stageY = 485;

    const stageGfx = this.add.graphics();

    // Drop Shadow
    stageGfx.fillStyle(0x000000, 0.55);
    stageGfx.fillRoundedRect(stageX - stageW / 2 + 6, stageY - stageH / 2 + 10, stageW, stageH, 24);

    // Base Enamel Khas Tim
    stageGfx.fillStyle(t.cardBaseColor, 1);
    stageGfx.fillRoundedRect(stageX - stageW / 2, stageY - stageH / 2, stageW, stageH, 24);

    // Face Glassmorphism
    stageGfx.fillStyle(t.cardFaceColor, 0.97);
    stageGfx.fillRoundedRect(stageX - stageW / 2 + 4, stageY - stageH / 2 + 4, stageW - 8, stageH - 8, 20);

    // Polished Golden Border
    stageGfx.lineStyle(3, t.accentColor, 1);
    stageGfx.strokeRoundedRect(stageX - stageW / 2 + 4, stageY - stageH / 2 + 4, stageW - 8, stageH - 8, 20);

    // Inner Hairline
    stageGfx.lineStyle(1.5, 0xfef08a, 0.45);
    stageGfx.strokeRoundedRect(stageX - stageW / 2 + 8, stageY - stageH / 2 + 8, stageW - 16, stageH - 16, 17);

    // Vertical Divider Line Antara Kolom Maskot & Kolom Informasi
    const dividerX = stageX - 120;
    stageGfx.lineStyle(1.5, t.accentColor, 0.4);
    stageGfx.lineBetween(dividerX, stageY - stageH / 2 + 25, dividerX, stageY + stageH / 2 - 25);

    this.stageContainer.add(stageGfx);

    // ==========================================
    // KOLOM KIRI: PANGGUNG MASKOT BESAR & PEDESTAL
    // ==========================================
    const mascotCenterX = stageX - 350;
    const mascotCenterY = stageY + 10;

    // Radial Aura Tim
    const auraCircle = this.add.circle(mascotCenterX, mascotCenterY, 140, t.auraColor, 0.25);
    this.stageContainer.add(auraCircle);

    // 3D Pedestal Shadow
    const pedestalShadow = this.add.ellipse(mascotCenterX, mascotCenterY + 125, 260, 36, 0x000000, 0.45);
    this.stageContainer.add(pedestalShadow);

    // Sprite Maskot Hewan Resolusi Tinggi
    const mascotImg = this.add.image(mascotCenterX, mascotCenterY, t.mascot);
    const targetSize = Math.round(270 * (t.mascotScale || 1.0));
    mascotImg.setDisplaySize(targetSize, targetSize);
    this.stageContainer.add(mascotImg);

    // Animasi Napas (Breathing Idle Tween)
    this.tweens.add({
      targets: [mascotImg, auraCircle],
      y: mascotCenterY - 10,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Lencana Status Misi Selesai (Jika Sudah Pernah Tuntas di Sesi Kelas)
    if (this.classSession.completedMissions[t.missionId]) {
      const doneGfx = this.add.graphics();
      doneGfx.fillStyle(0x166534, 1);
      doneGfx.fillRoundedRect(mascotCenterX - 95, stageY - stageH / 2 + 30, 190, 42, 21);
      doneGfx.fillStyle(0x22c55e, 1);
      doneGfx.fillRoundedRect(mascotCenterX - 95, stageY - stageH / 2 + 28, 190, 40, 20);
      doneGfx.lineStyle(2, 0xfef08a, 1);
      doneGfx.strokeRoundedRect(mascotCenterX - 95, stageY - stageH / 2 + 28, 190, 40, 20);
      this.stageContainer.add(doneGfx);

      const doneText = this.add.text(mascotCenterX, stageY - stageH / 2 + 48, '⭐ MISI SELESAI', {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '24px',
        color: '#ffffff',
        fontStyle: 'bold'
      }).setOrigin(0.5);
      this.stageContainer.add(doneText);
    }

    // ==========================================
    // KOLOM KANAN: DOSSIER SAINS & TOMBOL AKSI
    // ==========================================
    const infoStartX = dividerX + 40;
    const contentW = stageW / 2 + 80;

    // Baris 1: Tag Kategori & Medali Resmi
    const row1Y = stageY - stageH / 2 + 48;
    const tagBg = this.add.graphics();
    tagBg.fillStyle(0x021a14, 0.85);
    tagBg.fillRoundedRect(infoStartX, row1Y - 20, 270, 42, 10);
    tagBg.lineStyle(1.5, t.accentColor, 0.9);
    tagBg.strokeRoundedRect(infoStartX, row1Y - 20, 270, 42, 10);
    this.stageContainer.add(tagBg);

    const tagText = this.add.text(infoStartX + 135, row1Y, t.roleTag, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '24px',
      color: '#fef08a',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    this.stageContainer.add(tagText);

    // Medali Emas Resmi Pahlawan
    const badgeX = stageX + stageW / 2 - 65;
    const badgeGlow = this.add.circle(badgeX, row1Y, 38, t.accentColor, 0.4);
    const badgeImg = this.add.image(badgeX, row1Y, t.badge).setDisplaySize(76, 76);
    this.stageContainer.add([badgeGlow, badgeImg]);

    // Baris 2: Nama Tim
    const nameY = row1Y + 54;
    const nameText = this.add.text(infoStartX, nameY, t.name, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '44px',
      color: '#ffffff',
      fontStyle: 'bold',
      shadow: { offsetY: 2, color: '#000000', blur: 4, fill: true }
    });
    this.stageContainer.add(nameText);

    // Baris 3: Semboyan Tim
    const mottoY = nameY + 44;
    const mottoText = this.add.text(infoStartX, mottoY, `"${t.motto}"`, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '26px',
      color: '#fde68a',
      fontStyle: 'bold'
    });
    this.stageContainer.add(mottoText);

    // Baris 4: Kotak Dossier Peran Ekologis & Rantai Makanan
    const boxY = mottoY + 38;
    const boxW = 590;
    const boxH = 142;

    const roleBoxGfx = this.add.graphics();
    roleBoxGfx.fillStyle(0x021a14, 0.92);
    roleBoxGfx.fillRoundedRect(infoStartX, boxY, boxW, boxH, 14);
    roleBoxGfx.lineStyle(1.5, t.accentColor, 0.8);
    roleBoxGfx.strokeRoundedRect(infoStartX, boxY, boxW, boxH, 14);
    this.stageContainer.add(roleBoxGfx);

    // Sub-judul Peran
    const roleTitle = this.add.text(infoStartX + 18, boxY + 16, t.role, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '24px',
      color: '#a7f3d0',
      fontStyle: 'bold'
    });

    // Garis Organisme Padanan 4 Bioma
    const orgText = this.add.text(infoStartX + 18, boxY + 48, `🌱 ${t.biomeRole}`, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '24px',
      color: '#fef08a',
      fontStyle: 'bold',
      wordWrap: { width: boxW - 36 }
    });

    // Deskripsi Tugas Ekologis
    const descText = this.add.text(infoStartX + 18, boxY + 84, t.desc, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '24px',
      color: '#e2e8f0',
      wordWrap: { width: boxW - 36 },
      lineSpacing: 4
    });
    this.stageContainer.add([roleTitle, orgText, descText]);

    // Baris 5: Banner Penugasan Misi Spesialis
    const missionY = boxY + boxH + 16;
    const missionGfx = this.add.graphics();
    missionGfx.fillStyle(0x082f49, 0.92);
    missionGfx.fillRoundedRect(infoStartX, missionY, boxW, 46, 12);
    missionGfx.lineStyle(1.5, 0x38bdf8, 0.85);
    missionGfx.strokeRoundedRect(infoStartX, missionY, boxW, 46, 12);
    this.stageContainer.add(missionGfx);

    const missionText = this.add.text(infoStartX + boxW / 2, missionY + 23, `⭐ SPESIALIS TUGAS: ${t.missionLabel.toUpperCase()}`, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '24px',
      color: '#7dd3fc',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    this.stageContainer.add(missionText);

    // Baris 6: Tombol Chunky 3D "👉 PILIH TIM INI! 🚀"
    const btnW = boxW;
    const btnH = 74;
    const btnX = infoStartX + btnW / 2;
    const btnY = missionY + 46 + 18 + btnH / 2;

    const btnContainer = this.add.container(btnX, btnY);
    const btnGfx = this.add.graphics();

    const drawButton = (isPressed) => {
      btnGfx.clear();
      const dy = isPressed ? 4 : 0;
      // 3D Bevel Shadow
      btnGfx.fillStyle(t.btnBaseColor || 0xb45309, 1);
      btnGfx.fillRoundedRect(-btnW / 2, -btnH / 2 + 5, btnW, btnH, 18);

      // Button Face
      btnGfx.fillStyle(t.btnFaceColor || 0xf59e0b, 1);
      btnGfx.fillRoundedRect(-btnW / 2, -btnH / 2 + dy, btnW, btnH - 5, 18);

      // Gold Glow Border
      btnGfx.lineStyle(2.5, 0xfef08a, 1);
      btnGfx.strokeRoundedRect(-btnW / 2, -btnH / 2 + dy, btnW, btnH - 5, 18);
    };

    drawButton(false);
    btnContainer.add(btnGfx);

    const btnText = this.add.text(0, 0, '👉 PILIH TIM INI! 🚀', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '30px',
      color: '#ffffff',
      fontStyle: 'bold',
      shadow: { offsetY: 2, color: '#000000', blur: 4, fill: true }
    }).setOrigin(0.5);
    btnContainer.add(btnText);

    btnContainer.setSize(btnW, btnH);
    btnContainer.setInteractive({ useHandCursor: true });

    btnContainer.on('pointerover', () => {
      btnContainer.setScale(1.02);
      if (window.soundEngine) window.soundEngine.playBeep();
    });
    btnContainer.on('pointerout', () => {
      btnContainer.setScale(1.0);
    });

    btnContainer.on('pointerdown', () => {
      drawButton(true);
      btnText.y = 3;

      // Gelombang kejut Shockwave Ring emas
      const ring = this.add.circle(btnX, btnY, 40, 0xfef08a, 0.85);
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

      this.time.delayedCall(160, () => {
        this.registry.set('activeTeam', t);
        this.registry.set('assignedMissionId', t.missionId);
        this.registry.set('activeEcosystem', 'sawah');

        if (window.soundEngine) {
          window.soundEngine.playVO('vo_team_selected', 'Pilihan hebat! Tim detektif sudah siap. Ayo jelajahi ekosistem Nusantara!');
        }

        // Transisi sinematik halus ke BiomeSelectScene
        this.cameras.main.fade(320, 2, 44, 34);
        this.time.delayedCall(320, () => {
          this.scene.start('BiomeSelectScene');
        });
      });
    });

    btnContainer.on('pointerup', () => {
      drawButton(false);
      btnText.y = 0;
    });

    this.stageContainer.add(btnContainer);

    // Animasi Masuk Halus (Slide & Fade) saat Berganti Hero
    if (isAnimated) {
      this.stageContainer.setAlpha(0);
      this.stageContainer.y = 12;
      this.tweens.add({
        targets: this.stageContainer,
        alpha: 1,
        y: 0,
        duration: 260,
        ease: 'Cubic.easeOut'
      });
    }

    // Perbarui Tampilan Sorotan Dok Selektor di Bawah
    this.updateBottomDockHighlights();
  }

  /**
   * Tombol Panah Arkade Samping & Pendeteksi Gestur Usap Sentuh IFP
   */
  createNavigationControls(width, height) {
    const arrowY = 485;
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
        this.navigateTeam(dir);
      });

      return container;
    };

    createArrowBtn(175, '◀', -1);
    createArrowBtn(width - 175, '▶', 1);

    // Pendeteksi Gestur Sentuh Geser Layar (Touch Swipe Gesture)
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
          this.navigateTeam(1);  // Swipe kiri -> Pahlawan berikutnya
        } else {
          this.navigateTeam(-1); // Swipe kanan -> Pahlawan sebelumnya
        }
      }
    });
  }

  /**
   * Pindah Indeks Pahlawan (Looping 0 - 4)
   */
  navigateTeam(direction) {
    if (window.soundEngine) window.soundEngine.playBeep();
    this.currentTeamIndex = (this.currentTeamIndex + direction + this.teams.length) % this.teams.length;
    this.updateHeroView(true);
  }

  /**
   * Dok Selektor Miniatur 5 Tim di Bawah Panggung (1-Touch Instant Select)
   */
  createBottomHeroDock(width, height) {
    const dockY = 825;
    const tileW = 236;
    const tileH = 82;
    const tileGap = 16;
    const tileRadius = 18;

    const totalDockW = (this.teams.length * tileW) + ((this.teams.length - 1) * tileGap);
    const startX = width / 2 - totalDockW / 2 + tileW / 2;

    this.dockTiles = [];

    this.teams.forEach((t, i) => {
      const tx = startX + (i * (tileW + tileGap));
      const tileContainer = this.add.container(tx, dockY);
      const gfx = this.add.graphics();
      tileContainer.add(gfx);

      // Mini Badge Lencana
      const miniBadge = this.add.image(-tileW / 2 + 40, 0, t.badge).setDisplaySize(50, 50);

      // Nama Tim
      const miniName = this.add.text(-tileW / 2 + 76, 0, t.name, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '24px',
        color: '#e2e8f0',
        fontStyle: 'bold'
      }).setOrigin(0, 0.5);

      tileContainer.add([miniBadge, miniName]);
      tileContainer.setSize(tileW, tileH);
      tileContainer.setInteractive({ useHandCursor: true });

      tileContainer.on('pointerover', () => {
        tileContainer.setScale(1.04);
      });
      tileContainer.on('pointerout', () => {
        tileContainer.setScale(i === this.currentTeamIndex ? 1.05 : 1.0);
      });

      tileContainer.on('pointerdown', () => {
        if (this.currentTeamIndex !== i) {
          if (window.soundEngine) window.soundEngine.playBeep();
          this.currentTeamIndex = i;
          this.updateHeroView(true);
        }
      });

      this.dockTiles.push({ container: tileContainer, gfx: gfx, name: miniName, team: t, w: tileW, h: tileH, r: tileRadius });
    });
  }

  /**
   * Perbarui Sorotan Visual Emas pada Ubin yang Sedang Aktif
   */
  updateBottomDockHighlights() {
    if (!this.dockTiles) return;

    this.dockTiles.forEach((item, i) => {
      const isActive = (i === this.currentTeamIndex);
      const { gfx, w, h, r } = item;
      gfx.clear();

      if (isActive) {
        // Shadow
        gfx.fillStyle(0x000000, 0.45);
        gfx.fillRoundedRect(-w / 2 + 2, -h / 2 + 4, w, h, r);
        // Base Emerald
        gfx.fillStyle(0x064e3b, 1);
        gfx.fillRoundedRect(-w / 2, -h / 2, w, h, r);
        // Golden Border
        gfx.lineStyle(3, 0xf59e0b, 1);
        gfx.strokeRoundedRect(-w / 2, -h / 2, w, h, r);

        item.name.setColor('#fef08a');
        item.container.setScale(1.05);
      } else {
        // Subtle base
        gfx.fillStyle(0x021a14, 0.92);
        gfx.fillRoundedRect(-w / 2, -h / 2, w, h, r);
        // Slate Border
        gfx.lineStyle(2, 0x334155, 0.85);
        gfx.strokeRoundedRect(-w / 2, -h / 2, w, h, r);

        item.name.setColor('#94a3b8');
        item.container.setScale(1.0);
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
   * Footer Tips Guru Ramah Siswa
   */
  createTeacherTipBar(width, height) {
    const footerW = 1680;
    const footerH = 54;
    const footerY = height - 38;

    const footerGfx = this.add.graphics();
    footerGfx.fillStyle(0x064e3b, 0.95);
    footerGfx.fillRoundedRect(width / 2 - footerW / 2, footerY - footerH / 2, footerW, footerH, 27);
    footerGfx.lineStyle(2.5, 0x10b981, 1);
    footerGfx.strokeRoundedRect(width / 2 - footerW / 2, footerY - footerH / 2, footerW, footerH, 27);

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
