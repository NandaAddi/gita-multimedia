/**
 * ECO-EXPLORER (PHASER 3) - BOOT SCENE
 * Memuat aset gambar secara aman:
 * Menggunakan Base64 Data URIs (bebas galat CORS pada protokol file://)
 * dengan opsi fallback ke folder assets/.
 */

class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    const { width, height } = this.scale;

    // Background layar pemuatan
    this.add.rectangle(width / 2, height / 2, width, height, 0x064e3b);

    // Judul & Progress Bar
    this.add.text(width / 2, height / 2 - 60, '🌾 ECO-EXPLORER: PENJAGA SAWAH', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '40px',
      color: '#fbbf24',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const statusText = this.add.text(width / 2, height / 2 + 10, 'Menyiapkan Aset Pixel Art 16-Bit...', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '22px',
      color: '#d1fae5'
    }).setOrigin(0.5);

    const barWidth = 460;
    const barHeight = 24;
    this.add.rectangle(width / 2, height / 2 + 65, barWidth, barHeight, 0x022c22);
    const barFill = this.add.rectangle(width / 2 - barWidth / 2, height / 2 + 65, 0, barHeight - 4, 0x10b981).setOrigin(0, 0.5);

    this.load.on('progress', (value) => {
      barFill.width = (barWidth - 4) * value;
      statusText.setText(`Memuat Aset: ${Math.floor(value * 100)}%`);
    });

    // Daftar semua kunci aset yang dibutuhkan
    const assetKeys = [
      'gita_idle', 'gita_talk',
      'kiki_idle', 'kiki_talk',
      'padi_subur', 'padi_kering',
      'tikus', 'katak', 'ular', 'elang', 'jamur', 'bangkai',
      'bg_sawah',
      'dialog_box',
      'title_billboard',
      'card_mulai_bermain', 'card_cara_bermain', 'card_tentang_panduan',
      'icon_kemarau', 'icon_pestisida', 'icon_perburuan', 'icon_irigasi', 'icon_jamur_spora',
      'badge_elang', 'badge_ular', 'badge_katak', 'badge_padi', 'badge_jamur'
    ];

    // Cek apakah data base64 tersedia (100% bebas dari CORS file://)
    const hasDataURI = typeof window.ASSETS_DATA !== 'undefined' && window.ASSETS_DATA;

    assetKeys.forEach(key => {
      if (hasDataURI && window.ASSETS_DATA[key]) {
        // Muat langsung string Data URI (instan, aman, offline)
        this.load.image(key, window.ASSETS_DATA[key]);
      } else {
        // Fallback muat dari file fisik di folder assets/
        const relativePaths = {
          gita_idle: 'assets/characters/gita_idle.png',
          gita_talk: 'assets/characters/gita_idle.png',
          kiki_idle: 'assets/characters/gita_idle.png',
          kiki_talk: 'assets/characters/gita_idle.png',
          padi_subur: 'assets/organisms/padi_subur.png',
          padi_kering: 'assets/organisms/padi_kering.png',
          tikus: 'assets/organisms/tikus.png',
          katak: 'assets/organisms/katak.png',
          ular: 'assets/organisms/ular.png',
          elang: 'assets/organisms/elang.png',
          jamur: 'assets/organisms/jamur.png',
          bangkai: 'assets/organisms/bangkai.png',
          bg_sawah: 'assets/environment/background_sawah.png',
          title_billboard: 'assets/ui/title_billboard.png',
          card_mulai_bermain: 'assets/ui/card_mulai_bermain.png',
          card_cara_bermain: 'assets/ui/card_cara_bermain.png',
          card_tentang_panduan: 'assets/ui/card_tentang_panduan.png',
          dialog_box: 'assets/ui/dialog_box.png',
          icon_kemarau: 'assets/ui/icon_kemarau.png',
          icon_pestisida: 'assets/ui/icon_pestisida.png',
          icon_perburuan: 'assets/ui/icon_perburuan.png',
          icon_irigasi: 'assets/ui/icon_irigasi.png',
          icon_jamur_spora: 'assets/ui/icon_jamur_spora.png',
          badge_elang: 'assets/ui/badges/badge_elang.png',
          badge_ular: 'assets/ui/badges/badge_ular.png',
          badge_katak: 'assets/ui/badges/badge_katak.png',
          badge_padi: 'assets/ui/badges/badge_padi.png',
          badge_jamur: 'assets/ui/badges/badge_jamur.png'
        };
        if (relativePaths[key]) {
          this.load.image(key, relativePaths[key]);
        }
      }
    });
  }

  create() {
    this.time.delayedCall(300, () => {
      this.scene.start('TitleScene');
    });
  }
}

window.BootScene = BootScene;
