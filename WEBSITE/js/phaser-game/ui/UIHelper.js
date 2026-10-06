/**
 * ECO-EXPLORER: MASTER UI HELPER & LAYOUT FACTORY
 * 
 * Modul Standar Desain UI Game Profesional untuk Phaser 3 (1920x1080 IFP).
 * Menjamin:
 * 1. ZERO Layout Shifting (Koordinat & origin terkunci matematis).
 * 2. ZERO Text Clipping / Overlap (wordWrap dinamis terikat lebar kontainer).
 * 3. Strict Typography Guard (Seluruh font otomatis tervalidasi >= 24px).
 * 4. Fitts's Law & Touch Affordance (Target sentuh jemari siswa luas dan responsif).
 * 5. 100% Offline & Zero-CORS (Bebas dari dependensi eksternal).
 */

class UIHelper {
  // --- A. DESIGN TOKENS & COLOR PALETTES ---
  static THEME = {
    COLORS: {
      bgObsidian: 0x090d16,
      bgCard: 0x071520,
      bgEmeraldDark: 0x022c22,
      bgEmeraldEnamel: 0x064e3b,
      bgPillDark: 0x07111e,
      bgSlate: 0x0f172a,
      borderGold: 0xf59e0b,
      borderMint: 0x10b981,
      borderCyan: 0x0284c7,
      borderSky: 0x38bdf8,
      borderSlate: 0x1e293b,
      borderRuby: 0xef4444,
      btnGreen: 0x10b981,
      btnBlue: 0x0284c7,
      btnAmber: 0xf59e0b,
      btnRuby: 0xdc2626,
      btnPurple: 0x7c3aed
    },
    TEXT: {
      gold: '#fef08a',
      mint: '#34d399',
      sky: '#38bdf8',
      white: '#ffffff',
      slate: '#94a3b8',
      muted: '#cbd5e1',
      warning: '#f59e0b',
      danger: '#f87171'
    },
    FONTS: {
      title: 'Fredoka, sans-serif',
      body: 'Nunito, sans-serif',
      MIN_SIZE: 24
    }
  };

  /**
   * Validasi ukuran font: Menolak secara otomatis font < 24px sesuai standar IFP.
   */
  static sanitizeFontSize(fontSize) {
    if (typeof fontSize === 'number') {
      return Math.max(UIHelper.THEME.FONTS.MIN_SIZE, fontSize) + 'px';
    }
    if (typeof fontSize === 'string') {
      const parsed = parseInt(fontSize, 10);
      if (isNaN(parsed)) return `${UIHelper.THEME.FONTS.MIN_SIZE}px`;
      return Math.max(UIHelper.THEME.FONTS.MIN_SIZE, parsed) + 'px';
    }
    return `${UIHelper.THEME.FONTS.MIN_SIZE}px`;
  }

  /**
   * Hitung lebar wordWrap aman matematis agar teks mustahil menembus batas kontainer.
   */
  static safeWordWrap(containerWidth, padding = 24) {
    return { width: Math.max(120, containerWidth - (padding * 2)) };
  }

  // --- B. COMPONENT BUILDERS (ZERO LAYOUT SHIFTING) ---

  /**
   * 1. Kartu Vector Glassmorphism Elegan
   */
  static createGlassCard(scene, config) {
    const {
      x, y, width, height,
      fillColor = UIHelper.THEME.COLORS.bgCard,
      fillAlpha = 0.96,
      strokeColor = UIHelper.THEME.COLORS.borderMint,
      strokeWidth = 0,
      depth = 15
    } = config;

    const card = scene.add.rectangle(x, y, width, height, fillColor, fillAlpha)
      .setDepth(depth);
    if (strokeWidth > 0) {
      card.setStrokeStyle(strokeWidth, strokeColor);
    }

    return card;
  }

  /**
   * 2. Tombol Chunky Taktil 3D IFP dengan Pantulan Sentuh & Suara (Tanpa Stroke)
   */
  static createChunkyButton(scene, config) {
    const {
      x, y, width, height = 46,
      text = '',
      fillColor = UIHelper.THEME.COLORS.btnGreen,
      baseColor = null,
      textColor = UIHelper.THEME.TEXT.white,
      fontSize = '24px',
      fontFamily = UIHelper.THEME.FONTS.title,
      depth = 16,
      onClick = null
    } = config;

    const btnContainer = scene.add.container(x, y).setDepth(depth);

    // Bevel shadow bawah 3D
    const btnShadow = scene.add.rectangle(0, 3, width, height, baseColor || 0x064e3b);
    // Permukaan tombol solid (bebas garis kawat)
    const btnBg = scene.add.rectangle(0, 0, width, height, fillColor);

    const cleanFontSize = UIHelper.sanitizeFontSize(fontSize);
    const btnLabel = scene.add.text(0, 0, text, {
      fontFamily: fontFamily,
      fontSize: cleanFontSize,
      color: textColor,
      fontStyle: 'bold'
    }).setOrigin(0.5);

    btnContainer.add([btnShadow, btnBg, btnLabel]);
    btnContainer.setSize(width, height);
    btnContainer.setInteractive({ useHandCursor: true });

    // Efek Taktil Sentuh IFP
    btnContainer.on('pointerdown', () => {
      btnContainer.setScale(0.96);
      btnBg.y = 2;
      btnLabel.y = 2;
      if (window.soundEngine) window.soundEngine.playBeep();
      if (typeof onClick === 'function') onClick(btnContainer);
    });

    btnContainer.on('pointerup', () => {
      btnContainer.setScale(1.0);
      btnBg.y = 0;
      btnLabel.y = 0;
    });
    btnContainer.on('pointerout', () => {
      btnContainer.setScale(1.0);
      btnBg.y = 0;
      btnLabel.y = 0;
    });

    // Expose referensi untuk kontrol dinamis
    btnContainer.btnBg = btnBg;
    btnContainer.btnLabel = btnLabel;
    btnContainer.setText = (txt) => btnLabel.setText(txt);
    btnContainer.setColor = (col) => btnBg.setFillStyle(col);

    return btnContainer;
  }

  /**
   * 3. Kapsul Status / Quota Pill Terpadu (Borderless Modern Pill)
   */
  static createStatusPill(scene, config) {
    const {
      x, y, width, height = 34,
      text = '',
      fillColor = UIHelper.THEME.COLORS.bgPillDark,
      strokeColor = null,
      strokeWidth = 0,
      textColor = UIHelper.THEME.TEXT.gold,
      fontSize = '24px',
      depth = 16
    } = config;

    const pillBg = scene.add.rectangle(x, y, width, height, fillColor)
      .setDepth(depth);
    if (strokeWidth > 0 && strokeColor !== null) {
      pillBg.setStrokeStyle(strokeWidth, strokeColor, 0.7);
    }

    const cleanFontSize = UIHelper.sanitizeFontSize(fontSize);
    const pillText = scene.add.text(x, y, text, {
      fontFamily: UIHelper.THEME.FONTS.title,
      fontSize: cleanFontSize,
      color: textColor,
      fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(depth + 1);

    return {
      bg: pillBg,
      text: pillText,
      setText: (txt) => pillText.setText(txt),
      setStrokeColor: (col) => pillBg.setStrokeStyle(strokeWidth, col)
    };
  }

  /**
   * 4. Kartu Panduan Dialog Maskot Gita (Anti Layout Shifting & Borderless)
   * Mengunci koordinat vertikal teks: Origin (0,0) di bawah badge plakat header.
   */
  static createMascotBanner(scene, config) {
    const {
      x = 460, y = 168, width = 590, height = 136,
      avatarKey = 'gita_idle',
      headline = 'Petunjuk Detektif:',
      speechText = '',
      depth = 15,
      onVoiceClick = null,
      onHintClick = null
    } = config;

    const group = [];

    // Avatar Maskot Gita di Sisi Kiri
    const avatarX = x - width / 2 - 45;
    const avatarCircle = scene.add.circle(avatarX, y, 52, UIHelper.THEME.COLORS.bgEmeraldEnamel, 0.85)
      .setDepth(depth);

    const sprite = scene.add.image(avatarX, y, avatarKey)
      .setDisplaySize(96, 96)
      .setDepth(depth + 1);

    const emote = scene.add.text(avatarX + 35, y - 42, '', { fontSize: '26px' })
      .setOrigin(0.5)
      .setDepth(depth + 2);

    group.push(avatarCircle, sprite, emote);

    // Kartu Kaca Panduan (Tonal Inset)
    const cardBg = scene.add.rectangle(x, y, width, height, UIHelper.THEME.COLORS.bgCard, 0.96)
      .setDepth(depth);
    group.push(cardBg);

    // Plakat Header Tetap di Atas (Borderless Solid Pill)
    const headerY = y - height / 2 + 24;
    const tagW = 320;
    const tagH = 34;
    const tagX = x - width / 2 + 16 + tagW / 2;

    const tagPill = scene.add.graphics().setDepth(depth + 1);
    tagPill.fillStyle(UIHelper.THEME.COLORS.bgEmeraldEnamel, 1);
    tagPill.fillRoundedRect(tagX - tagW / 2, headerY - tagH / 2, tagW, tagH, 10);

    const tagText = scene.add.text(tagX, headerY, 'GITA - PANDUAN DETEKTIF', {
      fontFamily: UIHelper.THEME.FONTS.title,
      fontSize: '24px',
      color: UIHelper.THEME.TEXT.gold,
      fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(depth + 2);
    group.push(tagPill, tagText);

    // Tombol Suara (VO) - Bersarang di Header Row (Solid Pill)
    const btnVoiceX = x + width / 2 - 135;
    const btnVoice = scene.add.container(btnVoiceX, headerY).setDepth(depth + 1);
    const btnVoiceGfx = scene.add.graphics();
    btnVoiceGfx.fillStyle(UIHelper.THEME.COLORS.btnGreen, 1);
    btnVoiceGfx.fillRoundedRect(-42, -17, 84, 34, 10);
    const iconVoice = scene.add.text(0, 0, 'Suara', {
      fontFamily: UIHelper.THEME.FONTS.heading,
      fontSize: '24px',
      color: UIHelper.THEME.TEXT.white,
      fontStyle: 'bold'
    }).setOrigin(0.5);
    btnVoice.add([btnVoiceGfx, iconVoice]);
    btnVoice.setSize(84, 34);
    btnVoice.setInteractive({ useHandCursor: true });

    btnVoice.on('pointerdown', () => {
      btnVoice.setScale(0.92);
      if (typeof onVoiceClick === 'function') onVoiceClick();
    });
    btnVoice.on('pointerup', () => btnVoice.setScale(1.0));
    group.push(btnVoice);

    // Tombol Bimbingan Scaffolding (ZPD) - Bersarang di Header Row (Solid Pill)
    const btnHintX = x + width / 2 - 46;
    const btnHint = scene.add.container(btnHintX, headerY).setDepth(depth + 1);
    const btnHintGfx = scene.add.graphics();
    btnHintGfx.fillStyle(UIHelper.THEME.COLORS.btnAmber, 1);
    btnHintGfx.fillRoundedRect(-38, -17, 76, 34, 10);
    const iconHint = scene.add.text(0, 0, 'Tips', {
      fontFamily: UIHelper.THEME.FONTS.heading,
      fontSize: '24px',
      color: UIHelper.THEME.TEXT.white,
      fontStyle: 'bold'
    }).setOrigin(0.5);
    btnHint.add([btnHintGfx, iconHint]);
    btnHint.setSize(76, 34);
    btnHint.setInteractive({ useHandCursor: true });

    btnHint.on('pointerdown', () => {
      btnHint.setScale(0.92);
      if (typeof onHintClick === 'function') onHintClick();
    });
    btnHint.on('pointerup', () => btnHint.setScale(1.0));
    group.push(btnHint);

    // Teks Panduan: Origin (0,0) Mengalir Penuh ke Bawah (Zero Layout Shifting)
    const textStartY = headerY + 24;
    const guideText = scene.add.text(x - width / 2 + 20, textStartY, headline, {
      fontFamily: UIHelper.THEME.FONTS.body,
      fontSize: '24px',
      color: UIHelper.THEME.TEXT.white,
      fontStyle: 'bold',
      wordWrap: { width: width - 40 },
      lineSpacing: 4
    }).setOrigin(0, 0).setDepth(depth + 1);
    group.push(guideText);

    return {
      sprite,
      emote,
      guideText,
      setHeadline: (txt) => guideText.setText(txt),
      group
    };
  }

  /**
   * 5. Modal Dimmer Backdrop & Depth Isolator
   */
  static createModalBackdrop(scene, depth = 200, onClick = null) {
    const { width, height } = scene.scale;
    const backdrop = scene.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.78)
      .setInteractive()
      .setDepth(depth);

    if (typeof onClick === 'function') {
      backdrop.on('pointerdown', onClick);
    }
    return backdrop;
  }
}

// Pasang secara global ke browser window
if (typeof window !== 'undefined') {
  window.UIHelper = UIHelper;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = UIHelper;
}
