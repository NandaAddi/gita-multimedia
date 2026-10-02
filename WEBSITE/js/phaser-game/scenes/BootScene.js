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
    this.add.text(width / 2, height / 2 - 60, '🌾 ECO-EXPLORER: 4 EKOSISTEM NUSANTARA', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '40px',
      color: '#fbbf24',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const statusText = this.add.text(width / 2, height / 2 + 10, 'Menyiapkan Petualangan Edukasi Ekosistem...', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '26px',
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
      // Karakter Gita
      'gita_idle', 'gita_talk', 'gita_think', 'gita_cheer', 'gita_thumbsup', 'gita_expression_sheet',
      'kiki_idle', 'kiki_talk',
      // Panorama 4 Bioma
      'bg_sawah', 'bg_laut', 'bg_hutan', 'bg_danau',
      // Organisme Sawah
      'padi_subur', 'padi_kering', 'tikus', 'katak', 'ular', 'elang', 'jamur', 'bangkai',
      // Organisme Multi-Bioma
      'karang', 'ikan_kecil', 'penyu', 'hiu', 'pengurai_laut',
      'pohon_hutan', 'rusa', 'harimau', 'jamur_hutan',
      'teratai', 'keong', 'ikan_gabus', 'bangau', 'eceng_gondok',
      // Lencana 5 Tim Detektif
      'badge_elang', 'badge_ular', 'badge_katak', 'badge_padi', 'badge_jamur',
      // Lencana 4 Bioma
      'badge_sawah', 'badge_laut', 'badge_hutan', 'badge_danau',
      // UI & Menu Utama
      'title_billboard', 'card_mulai_bermain', 'card_cara_bermain', 'card_tentang_panduan',
      'dialog_box', 'hud_cooldown_bar', 'btn_tanya_teman',
      // Kartu Voting CSCL
      'card_voting_hijau', 'card_voting_kuning', 'card_voting_merah',
      // Ikon Krisis
      'icon_kemarau', 'icon_pestisida', 'icon_perburuan', 'icon_irigasi', 'icon_jamur_spora',
      'icon_bom_laut', 'icon_plastik_laut', 'icon_deforestasi', 'icon_limbah_danau', 'icon_racun_pestisida',
      // Kamus Popups
      'kamus_pematang', 'kamus_wereng', 'kamus_irigasi', 'kamus_pengurai',
      'kamus_pemangsa', 'kamus_hama', 'kamus_gulma', 'kamus_limbah'
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
          // Karakter
          gita_idle: 'assets/characters/gita_idle.png',
          gita_talk: 'assets/characters/gita_talk.png',
          gita_think: 'assets/characters/gita_think.png',
          gita_cheer: 'assets/characters/gita_cheer.png',
          gita_thumbsup: 'assets/characters/gita_thumbsup.png',
          gita_expression_sheet: 'assets/characters/gita_expression_sheet.png',
          kiki_idle: 'assets/characters/gita_idle.png',
          kiki_talk: 'assets/characters/gita_talk.png',
          // Latar Belakang
          bg_sawah: 'assets/environment/background_sawah.png',
          bg_laut: 'assets/environment/background_laut.png',
          bg_hutan: 'assets/environment/background_hutan.png',
          bg_danau: 'assets/environment/background_danau.png',
          // Organisme Sawah
          padi_subur: 'assets/organisms/padi_subur.png',
          padi_kering: 'assets/organisms/padi_kering.png',
          tikus: 'assets/organisms/tikus.png',
          katak: 'assets/organisms/katak.png',
          ular: 'assets/organisms/ular.png',
          elang: 'assets/organisms/elang.png',
          jamur: 'assets/organisms/jamur.png',
          bangkai: 'assets/organisms/bangkai.png',
          // Organisme Multi-Bioma
          karang: 'assets/organisms/karang.png',
          ikan_kecil: 'assets/organisms/ikan_kecil.png',
          penyu: 'assets/organisms/penyu.png',
          hiu: 'assets/organisms/hiu.png',
          pengurai_laut: 'assets/organisms/pengurai_laut.png',
          pohon_hutan: 'assets/organisms/pohon_hutan.png',
          rusa: 'assets/organisms/rusa.png',
          harimau: 'assets/organisms/harimau.png',
          jamur_hutan: 'assets/organisms/jamur_hutan.png',
          teratai: 'assets/organisms/teratai.png',
          keong: 'assets/organisms/keong.png',
          ikan_gabus: 'assets/organisms/ikan_gabus.png',
          bangau: 'assets/organisms/bangau.png',
          eceng_gondok: 'assets/organisms/eceng_gondok.png',
          // Lencana Tim
          badge_elang: 'assets/ui/badges/badge_elang.png',
          badge_ular: 'assets/ui/badges/badge_ular.png',
          badge_katak: 'assets/ui/badges/badge_katak.png',
          badge_padi: 'assets/ui/badges/badge_padi.png',
          badge_jamur: 'assets/ui/badges/badge_jamur.png',
          // Lencana Bioma
          badge_sawah: 'assets/ui/badges/badge_sawah.png',
          badge_laut: 'assets/ui/badges/badge_laut.png',
          badge_hutan: 'assets/ui/badges/badge_hutan.png',
          badge_danau: 'assets/ui/badges/badge_danau.png',
          // UI
          title_billboard: 'assets/ui/title_billboard.png',
          card_mulai_bermain: 'assets/ui/card_mulai_bermain.png',
          card_cara_bermain: 'assets/ui/card_cara_bermain.png',
          card_tentang_panduan: 'assets/ui/card_tentang_panduan.png',
          dialog_box: 'assets/ui/dialog_box.png',
          hud_cooldown_bar: 'assets/ui/hud_cooldown_bar.png',
          btn_tanya_teman: 'assets/ui/btn_tanya_teman.png',
          // Kartu Voting CSCL
          card_voting_hijau: 'assets/ui/card_voting_hijau.png',
          card_voting_kuning: 'assets/ui/card_voting_kuning.png',
          card_voting_merah: 'assets/ui/card_voting_merah.png',
          // Ikon Krisis
          icon_kemarau: 'assets/ui/icon_kemarau.png',
          icon_pestisida: 'assets/ui/icon_pestisida.png',
          icon_perburuan: 'assets/ui/icon_perburuan.png',
          icon_irigasi: 'assets/ui/icon_irigasi.png',
          icon_jamur_spora: 'assets/ui/icon_jamur_spora.png',
          icon_bom_laut: 'assets/ui/icon_bom_laut.png',
          icon_plastik_laut: 'assets/ui/icon_plastik_laut.png',
          icon_deforestasi: 'assets/ui/icon_deforestasi.png',
          icon_limbah_danau: 'assets/ui/icon_limbah_danau.png',
          icon_racun_pestisida: 'assets/ui/icon_racun_pestisida.png',
          // Kamus Popups
          kamus_pematang: 'assets/kamus/kamus_pematang.png',
          kamus_wereng: 'assets/kamus/kamus_wereng.png',
          kamus_irigasi: 'assets/kamus/kamus_irigasi.png',
          kamus_pengurai: 'assets/kamus/kamus_pengurai.png',
          kamus_pemangsa: 'assets/kamus/kamus_pemangsa.png',
          kamus_hama: 'assets/kamus/kamus_hama.png',
          kamus_gulma: 'assets/kamus/kamus_gulma.png',
          kamus_limbah: 'assets/kamus/kamus_limbah.png'
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
