const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'WEBSITE', 'js', 'phaser-game', 'scenes', 'SimulationScene.js');
let code = fs.readFileSync(filePath, 'utf8');

// 1. Patch init()
const oldInit = `    // Salin nilai populasi awal
    this.pop = { ...this.activeMission.initPop };
    this.organicWaste = (this.activeMission.id === 4) ? 60 : 35; // Tumpukan jerami (Misi 4 mulai 60 ikat)
    this.waterLevel = (this.activeMission.id === 3) ? 20 : 80;   // Air sawah (Misi 3 mulai kering 20%)
    this.pesticideClean = (this.activeMission.id === 2) ? false : true;`;

const newInit = `    this.biome = this.activeMission.biome || (this.activeMission.id >= 7 ? 'danau' : (this.activeMission.id >= 5 ? 'hutan' : (this.activeMission.id >= 3 ? 'laut' : 'sawah')));
    // Salin nilai populasi awal
    this.pop = { ...this.activeMission.initPop };
    this.organicWaste = (this.activeMission.id === 4) ? 60 : 35;
    this.waterLevel = (this.activeMission.id === 3) ? 20 : 80;
    this.pesticideClean = (this.activeMission.id % 2 === 0) ? false : true;
    this.humanHazardClean = (this.activeMission.id % 2 === 0) ? false : true;
    this.hazardSprites = [];`;

if (code.includes(oldInit)) {
  code = code.replace(oldInit, newInit);
  console.log('Patched init() successfully');
} else {
  console.warn('Could not find oldInit string');
}

// 2. Patch create() background and HUD title
const oldBg = `    // 1. Background Sawah Modern 2D Vector
    this.bg = this.add.image(width / 2, height / 2, 'bg_sawah');`;

const newBg = `    // 1. Background Sesuai Ekosistem Modern 2D Vector
    const bgKey = (this.biome === 'laut') ? 'bg_laut' : ((this.biome === 'hutan') ? 'bg_hutan' : ((this.biome === 'danau') ? 'bg_danau' : 'bg_sawah'));
    this.bg = this.add.image(width / 2, height / 2, bgKey);`;

if (code.includes(oldBg)) {
  code = code.replace(oldBg, newBg);
  console.log('Patched create() background successfully');
}

// 3. Patch HUD label: 'KESEHATAN SAWAH:' -> 'KESEHATAN ALAM:'
code = code.replace(`const tHealthLbl = this.add.text(730, 20, 'KESEHATAN SAWAH:',`, `const biomeNameUpper = (this.biome === 'laut') ? 'LAUT' : ((this.biome === 'hutan') ? 'HUTAN' : ((this.biome === 'danau') ? 'DANAU' : 'SAWAH'));
    const tHealthLbl = this.add.text(730, 20, 'KESEHATAN ' + biomeNameUpper + ':',`);

// 4. Patch spawnOrganisms() to support 4 biomes
const oldSpawnStart = `    this.organismGroup.clear(true, true);
    this.padiSprites = [];
    this.tikusSprites = [];
    this.katakSprites = [];
    this.ularSprites = [];
    this.elangSprites = [];
    this.jamurSprites = [];

    // A. Padi di Pematang (Y: 530 - 640)`;

const newSpawnLogic = `    this.organismGroup.clear(true, true);
    this.padiSprites = [];
    this.tikusSprites = [];
    this.katakSprites = [];
    this.ularSprites = [];
    this.elangSprites = [];
    this.jamurSprites = [];
    this.hazardSprites = [];

    if (this.biome === 'laut') {
      // === EKOSISTEM LAUT ===
      // 1. Karang (Y: 530 - 635)
      const kCount = Math.min(20, Math.max(3, Math.floor((this.pop.karang || 30) / 4.5)));
      for (let i = 0; i < kCount; i++) {
        const kx = 80 + (i * (width - 160) / kCount) + Phaser.Math.Between(-12, 12);
        const ky = Phaser.Math.Between(530, 630);
        const tex = (this.pop.karang >= 25 && this.pesticideClean) ? 'karang' : 'karang_rusak';
        const k = this.add.image(kx, ky, tex).setDisplaySize(84, 84);
        this.organismGroup.add(k);
        this.padiSprites.push(k);
        this.tweens.add({ targets: k, scaleX: 1.05, scaleY: 0.95, duration: Phaser.Math.Between(1800, 2600), yoyo: true, repeat: -1 });
      }
      // 2. Ikan Kecil (Y: 410 - 550)
      const ikCount = Math.min(16, Math.max(2, Math.floor((this.pop.ikan_kecil || 30) / 6)));
      for (let i = 0; i < ikCount; i++) {
        const ix = Phaser.Math.Between(100, width - 100);
        const iy = Phaser.Math.Between(410, 550);
        const fish = this.add.image(ix, iy, 'ikan_kecil').setDisplaySize(68, 68);
        this.organismGroup.add(fish);
        this.tikusSprites.push(fish);
        this.tweens.add({ targets: fish, x: ix + Phaser.Math.Between(-80, 80), duration: Phaser.Math.Between(1400, 2200), yoyo: true, repeat: -1 });
      }
      // 3. Penyu (Y: 330 - 470)
      const pCount = Math.min(6, Math.max(1, Math.floor((this.pop.penyu || 15) / 5)));
      for (let i = 0; i < pCount; i++) {
        const px = Phaser.Math.Between(150, width - 150);
        const py = Phaser.Math.Between(330, 470);
        const turtle = this.add.image(px, py, 'penyu').setDisplaySize(88, 88);
        this.organismGroup.add(turtle);
        this.katakSprites.push(turtle);
        this.tweens.add({ targets: turtle, x: px + Phaser.Math.Between(-50, 50), y: py + Phaser.Math.Between(-15, 15), duration: Phaser.Math.Between(2600, 4000), yoyo: true, repeat: -1 });
      }
      // 4. Hiu (Y: 180 - 310)
      const hCount = Math.min(4, Math.max(0, Math.floor((this.pop.hiu || 5) / 3)));
      for (let i = 0; i < hCount; i++) {
        const hx = Phaser.Math.Between(180, width - 180);
        const hy = Phaser.Math.Between(180, 310);
        const shark = this.add.image(hx, hy, 'hiu').setDisplaySize(115, 95);
        this.organismGroup.add(shark);
        this.ularSprites.push(shark);
        this.tweens.add({ targets: shark, x: (hx > width / 2) ? hx - 220 : hx + 220, duration: Phaser.Math.Between(3500, 5000), yoyo: true, repeat: -1 });
      }
      // 5. Pengurai Laut (Y: 675 - 745)
      const crCount = Math.min(8, Math.max(1, Math.floor((this.pop.pengurai || 20) / 5)));
      for (let i = 0; i < crCount; i++) {
        const cx = 120 + (i * (width - 240) / crCount);
        const cy = Phaser.Math.Between(675, 745);
        const crab = this.add.image(cx, cy, 'pengurai_laut').setDisplaySize(65, 65);
        this.organismGroup.add(crab);
        this.jamurSprites.push(crab);
      }
      // 6. Sampah Plastik (Misi 4 Ulah Manusia)
      if (!this.pesticideClean) {
        for (let s = 0; s < 5; s++) {
          const sx = Phaser.Math.Between(150, width - 150);
          const sy = Phaser.Math.Between(360, 550);
          const trash = this.add.image(sx, sy, 'sampah_plastik').setDisplaySize(62, 62);
          this.organismGroup.add(trash);
          this.hazardSprites.push(trash);
        }
      }
      return;
    }

    if (this.biome === 'hutan') {
      // === EKOSISTEM HUTAN TROPIS ===
      // 1. Pohon Rimba (Y: 480 - 610)
      const phCount = Math.min(18, Math.max(3, Math.floor((this.pop.pohon || 35) / 4)));
      for (let i = 0; i < phCount; i++) {
        const px = 80 + (i * (width - 160) / phCount) + Phaser.Math.Between(-10, 10);
        const py = Phaser.Math.Between(490, 605);
        const tex = (this.pop.pohon >= 25 && this.pesticideClean) ? 'pohon_hutan' : 'pohon_tumbang';
        const tr = this.add.image(px, py, tex).setDisplaySize(95, 105);
        this.organismGroup.add(tr);
        this.padiSprites.push(tr);
      }
      // 2. Rusa (Y: 575 - 665)
      const rCount = Math.min(12, Math.max(1, Math.floor((this.pop.rusa || 30) / 6)));
      for (let i = 0; i < rCount; i++) {
        const rx = Phaser.Math.Between(100, width - 100);
        const ry = Phaser.Math.Between(575, 665);
        const deer = this.add.image(rx, ry, 'rusa').setDisplaySize(78, 78);
        this.organismGroup.add(deer);
        this.tikusSprites.push(deer);
        this.tweens.add({ targets: deer, x: rx + Phaser.Math.Between(-50, 50), duration: Phaser.Math.Between(1400, 2200), yoyo: true, repeat: -1 });
      }
      // 3. Macan Dahan (Y: 585 - 685)
      const mCount = Math.min(6, Math.max(0, Math.floor((this.pop.macan || 15) / 5)));
      for (let i = 0; i < mCount; i++) {
        const mx = Phaser.Math.Between(120, width - 120);
        const my = Phaser.Math.Between(585, 685);
        const cat = this.add.image(mx, my, 'macan').setDisplaySize(85, 75);
        this.organismGroup.add(cat);
        this.katakSprites.push(cat);
      }
      // 4. Harimau Sumatera (Y: 625 - 720)
      const tgCount = Math.min(4, Math.max(0, Math.floor((this.pop.harimau || 4) / 2)));
      for (let i = 0; i < tgCount; i++) {
        const hx = Phaser.Math.Between(150, width - 150);
        const hy = Phaser.Math.Between(625, 720);
        const tiger = this.add.image(hx, hy, 'harimau').setDisplaySize(110, 100);
        this.organismGroup.add(tiger);
        this.ularSprites.push(tiger);
        this.tweens.add({ targets: tiger, x: hx + Phaser.Math.Between(-40, 40), duration: Phaser.Math.Between(2600, 3800), yoyo: true, repeat: -1 });
      }
      // 5. Jamur Hutan (Y: 695 - 765)
      const jmCount = Math.min(8, Math.max(1, Math.floor((this.pop.jamur || 20) / 5)));
      for (let i = 0; i < jmCount; i++) {
        const jx = 100 + (i * (width - 200) / jmCount);
        const jy = Phaser.Math.Between(695, 765);
        const shroom = this.add.image(jx, jy, 'jamur_hutan').setDisplaySize(65, 65);
        this.organismGroup.add(shroom);
        this.jamurSprites.push(shroom);
      }
      // 6. Kayu Tebangan Liar (Misi 6 Ulah Manusia)
      if (!this.pesticideClean) {
        for (let k = 0; k < 4; k++) {
          const kx = Phaser.Math.Between(150, width - 150);
          const ky = Phaser.Math.Between(530, 670);
          const logs = this.add.image(kx, ky, 'kayu_tebang').setDisplaySize(75, 70);
          this.organismGroup.add(logs);
          this.hazardSprites.push(logs);
        }
      }
      return;
    }

    if (this.biome === 'danau') {
      // === EKOSISTEM DANAU ===
      // 1. Teratai Air (Y: 520 - 625)
      const tCount = Math.min(18, Math.max(3, Math.floor((this.pop.teratai || 30) / 4)));
      for (let i = 0; i < tCount; i++) {
        const px = 80 + (i * (width - 160) / tCount) + Phaser.Math.Between(-12, 12);
        const py = Phaser.Math.Between(525, 620);
        const tex = (this.pop.teratai >= 20 && this.pesticideClean) ? 'teratai' : 'teratai_layu';
        const lily = this.add.image(px, py, tex).setDisplaySize(80, 80);
        this.organismGroup.add(lily);
        this.padiSprites.push(lily);
      }
      // 2. Keong Mas (Y: 580 - 675)
      const knCount = Math.min(14, Math.max(1, Math.floor((this.pop.keong || 30) / 6)));
      for (let i = 0; i < knCount; i++) {
        const kx = Phaser.Math.Between(100, width - 100);
        const ky = Phaser.Math.Between(580, 675);
        const snail = this.add.image(kx, ky, 'keong').setDisplaySize(68, 68);
        this.organismGroup.add(snail);
        this.tikusSprites.push(snail);
        this.tweens.add({ targets: snail, x: kx + Phaser.Math.Between(-40, 40), duration: Phaser.Math.Between(1500, 2500), yoyo: true, repeat: -1 });
      }
      // 3. Ikan Gabus (Y: 535 - 645)
      const gbCount = Math.min(8, Math.max(1, Math.floor((this.pop.ikan_gabus || 15) / 4)));
      for (let i = 0; i < gbCount; i++) {
        const gx = Phaser.Math.Between(120, width - 120);
        const gy = Phaser.Math.Between(535, 645);
        const fish = this.add.image(gx, gy, 'ikan_gabus').setDisplaySize(82, 70);
        this.organismGroup.add(fish);
        this.katakSprites.push(fish);
      }
      // 4. Burung Bangau (Y: 420 - 550)
      const bgCount = Math.min(4, Math.max(0, Math.floor((this.pop.bangau || 6) / 3)));
      for (let i = 0; i < bgCount; i++) {
        const bx = Phaser.Math.Between(150, width - 150);
        const by = Phaser.Math.Between(420, 545);
        const bird = this.add.image(bx, by, 'bangau').setDisplaySize(85, 95);
        this.organismGroup.add(bird);
        this.ularSprites.push(bird);
      }
      // 5. Pengurai Danau (Y: 685 - 755)
      const pdCount = Math.min(8, Math.max(1, Math.floor((this.pop.pengurai || 20) / 5)));
      for (let i = 0; i < pdCount; i++) {
        const px = 100 + (i * (width - 200) / pdCount);
        const py = Phaser.Math.Between(685, 755);
        const deco = this.add.image(px, py, 'pengurai_danau').setDisplaySize(65, 65);
        this.organismGroup.add(deco);
        this.jamurSprites.push(deco);
      }
      // 6. Eceng Gondok Eutrofikasi (Misi 8 Ulah Manusia)
      if (!this.pesticideClean) {
        for (let e = 0; e < 5; e++) {
          const ex = Phaser.Math.Between(120, width - 120);
          const ey = Phaser.Math.Between(470, 615);
          const weed = this.add.image(ex, ey, 'eceng_gondok').setDisplaySize(80, 80);
          this.organismGroup.add(weed);
          this.hazardSprites.push(weed);
        }
      }
      return;
    }

    // A. Padi di Pematang (Y: 530 - 640)`;

if (code.includes(oldSpawnStart)) {
  code = code.replace(oldSpawnStart, newSpawnLogic);
  console.log('Patched spawnOrganisms() successfully');
}

// 5. Patch getContextualActions() to support missions 1 to 8
const oldCtx = `  getContextualActions() {
    const mid = this.activeMission.id;

    if (mid === 1) {`;

const newCtx = `  getContextualActions() {
    const mid = this.activeMission.id;

    if (mid === 3) {
      // MISI 3 (LAUT M1): Hiu & Penyu
      return [
        {
          id: 'hiu',
          icon: '🦈',
          title: 'KONSERVASI HIU',
          desc: 'Predator puncak pengendali ikan',
          btnText: '➕ LEPAS 5 HIU',
          color: 0x0284c7,
          btnColor: 0x0369a1,
          statusGetter: () => \`🦈 Hiu: \${this.pop.hiu || 0}/10 ekor (🎯 Min 10)\`,
          handler: (btn) => this.applyEcosystemAction('hiu', +5, btn, '🦈 Hiu Dilepas! Menjaga Keseimbangan Ikan!')
        },
        {
          id: 'karang',
          icon: '🪸',
          title: 'RAWAT TERUMBU KARANG',
          desc: 'Habitat dan produsen samudra',
          btnText: '➕ RAWAT 10 KARANG',
          color: 0xec4899,
          btnColor: 0xbe185d,
          statusGetter: () => \`🪸 Karang: \${this.pop.karang || 0}/55 rumpun (🎯 Min 55)\`,
          handler: (btn) => this.applyEcosystemAction('karang', +10, btn, '🪸 Terumbu Karang Mekar Indah!')
        },
        {
          id: 'ikan_monitor',
          icon: '🐟',
          title: 'PANTAU IKAN KECIL',
          desc: 'Alami dikontrol oleh hiu',
          btnText: '👁️ AMATI SAMUDRA',
          color: 0x475569,
          btnColor: 0x334155,
          statusGetter: () => \`🐟 Ikan: \${this.pop.ikan_kecil || 0} ekor (🎯 Maks 40)\`,
          handler: (btn) => this.showFloatingNotice('💡 Hiu akan menyeimbangkan ikan kecil secara alami!', 0xfef08a)
        }
      ];
    } else if (mid === 4) {
      // MISI 4 (LAUT M2): Bersihkan Plastik & Larang Bom Ikan
      return [
        {
          id: 'bersih_plastik',
          icon: '🧹',
          title: 'BERSIHKAN SAMPAH',
          desc: 'Angkat sampah plastik samudra',
          btnText: '✨ BERSIHKAN PLASTIK',
          color: 0x0284c7,
          btnColor: 0x0369a1,
          statusGetter: () => (this.pesticideClean ? '✨ Laut: 100% Bersih (✅ Target)' : '🚯 Ada Sampah Plastik (⚠️ Bersihkan)'),
          handler: (btn) => {
            this.pesticideClean = true;
            this.showFloatingNotice('✨ Sampah Plastik Berhasil Diangkat!', 0x38bdf8);
            this.calculateEcosystemHealth();
            this.updateQuestObjectives();
            this.startActionCooldown();
          }
        },
        {
          id: 'larang_bom',
          icon: '🚫',
          title: 'LARANG BOM IKAN',
          desc: 'Zona lindung terumbu karang',
          btnText: '🛡️ TETAPKAN ZONA AMAN',
          color: 0x10b981,
          btnColor: 0x059669,
          statusGetter: () => (this.pop.karang >= 50 ? '🛡️ Zona Aman Aktif (✅)' : '⚠️ Karang Butuh Bibit Baru'),
          handler: (btn) => this.applyEcosystemAction('karang', +15, btn, '🛡️ Terumbu Karang Aman dari Bom Ikan!')
        },
        {
          id: 'penyu',
          icon: '🐢',
          title: 'RAWAT PENYU LAUT',
          desc: 'Satwa langka dilindungi',
          btnText: '➕ LEPAS 5 PENYU',
          color: 0x059669,
          btnColor: 0x047857,
          statusGetter: () => \`🐢 Penyu: \${this.pop.penyu || 0}/20 ekor (🎯 Min 20)\`,
          handler: (btn) => this.applyEcosystemAction('penyu', +5, btn, '🐢 Penyu Berenang Bebas Tanpa Plastik!')
        }
      ];
    } else if (mid === 5) {
      // MISI 5 (HUTAN M1): Rantai Rimba Harimau & Rusa
      return [
        {
          id: 'harimau',
          icon: '🐅',
          title: 'RAWAT HARIMAU',
          desc: 'Predator puncak penjaga rimba',
          btnText: '➕ LEPAS 2 HARIMAU',
          color: 0xea580c,
          btnColor: 0xc2410c,
          statusGetter: () => \`🐅 Harimau: \${this.pop.harimau || 0}/5 ekor (🎯 Min 5)\`,
          handler: (btn) => this.applyEcosystemAction('harimau', +2, btn, '🐅 Harimau Menjaga Keseimbangan Rimba!')
        },
        {
          id: 'pohon',
          icon: '🌳',
          title: 'RAWAT POHON BUAH',
          desc: 'Produsen makanan satwa rimba',
          btnText: '➕ RAWAT 10 POHON',
          color: 0x16a34a,
          btnColor: 0x15803d,
          statusGetter: () => \`🌳 Pohon: \${this.pop.pohon || 0}/55 pohon (🎯 Min 55)\`,
          handler: (btn) => this.applyEcosystemAction('pohon', +10, btn, '🌳 Kanopi Pohon Rimba Tumbuh Rimbun!')
        },
        {
          id: 'rusa_monitor',
          icon: '🦌',
          title: 'PANTAU KAWANAN RUSA',
          desc: 'Alami dikontrol oleh harimau',
          btnText: '👁️ AMATI KAWANAN RUSA',
          color: 0x475569,
          btnColor: 0x334155,
          statusGetter: () => \`🦌 Rusa: \${this.pop.rusa || 0} ekor (🎯 Maks 45)\`,
          handler: (btn) => this.showFloatingNotice('💡 Harimau menjaga populasi rusa tetap seimbang!', 0xfef08a)
        }
      ];
    } else if (mid === 6) {
      // MISI 6 (HUTAN M2): Deforestasi & Reboisasi
      return [
        {
          id: 'reboisasi',
          icon: '🌱',
          title: 'REBOISASI HUTAN',
          desc: 'Tanam bibit pohon kanopi baru',
          btnText: '🌱 TANAM 15 BIBIT POHON',
          color: 0x16a34a,
          btnColor: 0x15803d,
          statusGetter: () => \`🌳 Pohon: \${this.pop.pohon || 0}/50 pohon (🎯 Min 50)\`,
          handler: (btn) => this.applyEcosystemAction('pohon', +15, btn, '🌱 Reboisasi Tunas Pohon Rimba Berhasil!')
        },
        {
          id: 'patroli',
          icon: '🎯',
          title: 'PATROLI PENJAGA HUTAN',
          desc: 'Bongkar jerat kawat pemburu',
          btnText: '🛡️ HENTIKAN PEMBURU',
          color: 0x0284c7,
          btnColor: 0x0369a1,
          statusGetter: () => (this.pesticideClean ? '🛡️ Rimba Aman (✅ Bebas Jerat)' : '⚠️ Ada Jerat Pemburu (Bersihkan)'),
          handler: (btn) => {
            this.pesticideClean = true;
            this.showFloatingNotice('🛡️ Jerat Pemburu Dimusnahkan! Rimba Aman!', 0x38bdf8);
            this.calculateEcosystemHealth();
            this.updateQuestObjectives();
            this.startActionCooldown();
          }
        },
        {
          id: 'harimau_save',
          icon: '🐅',
          title: 'LINDUNGI HARIMAU',
          desc: 'Lepasliarkan ke habitat aman',
          btnText: '➕ LEPAS 2 HARIMAU',
          color: 0xea580c,
          btnColor: 0xc2410c,
          statusGetter: () => \`🐅 Harimau: \${this.pop.harimau || 0} ekor (🎯 Satwa Lindung)\`,
          handler: (btn) => this.applyEcosystemAction('harimau', +2, btn, '🐅 Harimau Sumatera Aman di Suaka Alam!')
        }
      ];
    } else if (mid === 7) {
      // MISI 7 (DANAU M1): Teratai & Ikan Gabus
      return [
        {
          id: 'ikan_gabus',
          icon: '🐟',
          title: 'LEPAS IKAN GABUS',
          desc: 'Predator pemangsa keong mas',
          btnText: '➕ LEPAS 10 IKAN GABUS',
          color: 0x0891b2,
          btnColor: 0x0e7490,
          statusGetter: () => \`🐟 Ikan: \${this.pop.ikan_gabus || 0}/15 ekor (🎯 Min 15)\`,
          handler: (btn) => this.applyEcosystemAction('ikan_gabus', +10, btn, '🐟 Ikan Gabus Menjaga Danau dari Keong Mas!')
        },
        {
          id: 'teratai',
          icon: '🪷',
          title: 'RAWAT BUNGA TERATAI',
          desc: 'Tanaman air produsen danau',
          btnText: '➕ TANAM 10 TERATAI',
          color: 0xec4899,
          btnColor: 0xbe185d,
          statusGetter: () => \`🪷 Teratai: \${this.pop.teratai || 0}/50 rumpun (🎯 Min 50)\`,
          handler: (btn) => this.applyEcosystemAction('teratai', +10, btn, '🪷 Bunga Teratai Mekar Indah di Air Danau!')
        },
        {
          id: 'keong_monitor',
          icon: '🐌',
          title: 'PANTAU KEONG MAS',
          desc: 'Alami dikontrol oleh ikan gabus',
          btnText: '👁️ AMATI KEONG MAS',
          color: 0x475569,
          btnColor: 0x334155,
          statusGetter: () => \`🐌 Keong: \${this.pop.keong || 0} ekor (🎯 Maks 35)\`,
          handler: (btn) => this.showFloatingNotice('💡 Ikan gabus dan bangau mengontrol keong mas!', 0xfef08a)
        }
      ];
    } else if (mid === 8) {
      // MISI 8 (DANAU M2): Eceng Gondok & Limbah Pabrik
      return [
        {
          id: 'angkat_gulma',
          icon: '🧹',
          title: 'ANGKAT ECENG GONDOK',
          desc: 'Buka kembali sirkulasi oksigen',
          btnText: '🧹 ANGKAT GULMA GONDOK',
          color: 0x0891b2,
          btnColor: 0x0e7490,
          statusGetter: () => (this.pesticideClean ? '✨ Permukaan Bersih (✅ Oksigen Normal)' : '🌿 Permukaan Tertutup (⚠️ Bersihkan)'),
          handler: (btn) => {
            this.pesticideClean = true;
            this.showFloatingNotice('✨ Gulma Eceng Gondok Berhasil Diangkat!', 0x22d3ee);
            this.calculateEcosystemHealth();
            this.updateQuestObjectives();
            this.startActionCooldown();
          }
        },
        {
          id: 'saring_limbah',
          icon: '🧪',
          title: 'PASANG SARINGAN ALAMI',
          desc: 'Netralkan detergen pabrik',
          btnText: '🧪 PASANG FILTER ALAMI',
          color: 0x10b981,
          btnColor: 0x059669,
          statusGetter: () => (this.pop.teratai >= 40 ? '💧 Air Danau Jernih (✅)' : '⚠️ Air Butuh Pemulihan'),
          handler: (btn) => this.applyEcosystemAction('teratai', +15, btn, '🧪 Filter Alami Menjernihkan Air Danau!')
        },
        {
          id: 'ikan_pulih',
          icon: '🐟',
          title: 'LEPAS BIBIT IKAN AIR TAWAR',
          desc: 'Pulihkan keanekaragaman danau',
          btnText: '➕ LEPAS 10 BIBIT IKAN',
          color: 0x0284c7,
          btnColor: 0x0369a1,
          statusGetter: () => \`🐟 Ikan: \${this.pop.ikan_gabus || 0}/20 ekor (🎯 Min 20)\`,
          handler: (btn) => this.applyEcosystemAction('ikan_gabus', +10, btn, '🐟 Bibit Ikan Berenang Sehat di Air Jernih!')
        }
      ];
    } else if (mid === 1) {`;

if (code.includes(oldCtx)) {
  code = code.replace(oldCtx, newCtx);
  console.log('Patched getContextualActions() successfully');
}

// 6. Patch updateQuestObjectives() to support missions 1 to 8
const oldQuest = `    if (this.activeMission.id === 1) {
      // Misi 1: Ular & Tikus`;

const newQuest = `    const mid = this.activeMission.id;
    if (mid === 3) {
      // Misi 3 (Laut M1)
      q1Met = (this.pop.hiu || 0) >= 10;
      t1 = \`\${q1Met ? '✅' : '⬜'} 🦈 Konservasi Hiu: \${this.pop.hiu || 0}/10 ekor (Min 10)\`;
      q2Met = (this.pop.ikan_kecil || 0) <= 40;
      t2 = \`\${q2Met ? '✅' : '⬜'} 🐟 Ikan Kecil Terkendali: \${this.pop.ikan_kecil || 0} ekor (Maks 40)\`;
      q3Met = (this.pop.karang || 0) >= 55;
      t3 = \`\${q3Met ? '✅' : '⬜'} 🪸 Terumbu Karang Lestari: \${this.pop.karang || 0}/55 rumpun\`;
    } else if (mid === 4) {
      // Misi 4 (Laut M2)
      q1Met = this.pesticideClean;
      t1 = \`\${q1Met ? '✅' : '⬜'} 🧹 Sampah Plastik Diangkat: \${q1Met ? '100% Bersih' : 'Belum Bersih'}\`;
      q2Met = (this.pop.karang || 0) >= 50;
      t2 = \`\${q2Met ? '✅' : '⬜'} 🪸 Karang Bebas Bom: \${this.pop.karang || 0}/50 rumpun\`;
      q3Met = this.ecoHealth >= 75;
      t3 = \`\${q3Met ? '✅' : '⬜'} 🌊 Samudra Karang Sehat (\${this.ecoHealth}%)\`;
    } else if (mid === 5) {
      // Misi 5 (Hutan M1)
      q1Met = (this.pop.harimau || 0) >= 5;
      t1 = \`\${q1Met ? '✅' : '⬜'} 🐅 Rawat Harimau: \${this.pop.harimau || 0}/5 ekor (Min 5)\`;
      q2Met = (this.pop.rusa || 0) <= 45;
      t2 = \`\${q2Met ? '✅' : '⬜'} 🦌 Kawanan Rusa Terkendali: \${this.pop.rusa || 0} ekor (Maks 45)\`;
      q3Met = (this.pop.pohon || 0) >= 55;
      t3 = \`\${q3Met ? '✅' : '⬜'} 🌳 Pohon Rimba Rimbun: \${this.pop.pohon || 0}/55 pohon\`;
    } else if (mid === 6) {
      // Misi 6 (Hutan M2)
      q1Met = (this.pop.pohon || 0) >= 50;
      t1 = \`\${q1Met ? '✅' : '⬜'} 🌱 Reboisasi Hutan: \${this.pop.pohon || 0}/50 pohon (Min 50)\`;
      q2Met = this.pesticideClean;
      t2 = \`\${q2Met ? '✅' : '⬜'} 🛡️ Patroli Anti-Pemburu: \${q2Met ? 'Aman' : 'Ada Jerat'}\`;
      q3Met = this.ecoHealth >= 75;
      t3 = \`\${q3Met ? '✅' : '⬜'} 🌲 Rimba Tropis Lestari (\${this.ecoHealth}%)\`;
    } else if (mid === 7) {
      // Misi 7 (Danau M1)
      q1Met = (this.pop.ikan_gabus || 0) >= 15;
      t1 = \`\${q1Met ? '✅' : '⬜'} 🐟 Lepas Ikan Gabus: \${this.pop.ikan_gabus || 0}/15 ekor (Min 15)\`;
      q2Met = (this.pop.keong || 0) <= 35;
      t2 = \`\${q2Met ? '✅' : '⬜'} 🐌 Keong Mas Terkendali: \${this.pop.keong || 0} ekor (Maks 35)\`;
      q3Met = (this.pop.teratai || 0) >= 50;
      t3 = \`\${q3Met ? '✅' : '⬜'} 🪷 Teratai Danau Asri: \${this.pop.teratai || 0}/50 rumpun\`;
    } else if (mid === 8) {
      // Misi 8 (Danau M2)
      q1Met = this.pesticideClean;
      t1 = \`\${q1Met ? '✅' : '⬜'} 🧹 Eceng Gondok Diangkat: \${q1Met ? 'Bersih' : 'Tertutup'}\`;
      q2Met = (this.pop.teratai || 0) >= 40;
      t2 = \`\${q2Met ? '✅' : '⬜'} 🧪 Filter Limbah Berfungsi: \${this.pop.teratai || 0}/40\`;
      q3Met = this.ecoHealth >= 75;
      t3 = \`\${q3Met ? '✅' : '⬜'} 🏞️ Danau Bening Sehat (\${this.ecoHealth}%)\`;
    } else if (this.activeMission.id === 1) {
      // Misi 1: Ular & Tikus`;

if (code.includes(oldQuest)) {
  code = code.replace(oldQuest, newQuest);
  console.log('Patched updateQuestObjectives() successfully');
}

// 7. Patch calculateEcosystemHealth() to handle missions 1 to 8
const oldHealthStart = `    // 1. Cek Padi
    if (this.pop.padi < 30) {`;

const newHealthStart = `    const mid = this.activeMission.id;

    if (mid === 3) {
      // Laut M1
      if ((this.pop.karang || 0) < 30) { score -= 25; feedback = 'Terumbu karang terlalu sedikit!'; }
      else if ((this.pop.karang || 0) >= 55) { score += 15; }
      if ((this.pop.ikan_kecil || 0) > 45 && (this.pop.hiu || 0) < 8) { score -= 30; feedback = 'Hiu kurang! Ikan kecil berlebih merusak alga karang!'; }
      else if ((this.pop.hiu || 0) >= 10 && (this.pop.ikan_kecil || 0) <= 40) { score += 20; }
    } else if (mid === 4) {
      // Laut M2
      if (!this.pesticideClean) { score -= 40; feedback = 'Sampah plastik laut meracuni penyu dan karang!'; }
      else { score += 20; }
      if ((this.pop.karang || 0) < 35) { score -= 20; feedback = 'Karang rusak akibat bom butuh bibit baru!'; }
      else if ((this.pop.karang || 0) >= 50) { score += 15; }
    } else if (mid === 5) {
      // Hutan M1
      if ((this.pop.pohon || 0) < 30) { score -= 25; feedback = 'Pohon rimba berkurang!'; }
      else if ((this.pop.pohon || 0) >= 55) { score += 15; }
      if ((this.pop.rusa || 0) > 50 && (this.pop.harimau || 0) < 4) { score -= 30; feedback = 'Harimau kurang! Populasi rusa memakan habis tunas pohon!'; }
      else if ((this.pop.harimau || 0) >= 5 && (this.pop.rusa || 0) <= 45) { score += 20; }
    } else if (mid === 6) {
      // Hutan M2
      if (!this.pesticideClean) { score -= 40; feedback = 'Jerat pemburu liar mengancam Harimau Sumatera!'; }
      else { score += 20; }
      if ((this.pop.pohon || 0) < 35) { score -= 25; feedback = 'Deforestasi parah! Lakukan reboisasi pohon!'; }
      else if ((this.pop.pohon || 0) >= 50) { score += 15; }
    } else if (mid === 7) {
      // Danau M1
      if ((this.pop.teratai || 0) < 25) { score -= 25; feedback = 'Tanaman teratai danau berkurang dimakan keong!'; }
      else if ((this.pop.teratai || 0) >= 50) { score += 15; }
      if ((this.pop.keong || 0) > 40 && (this.pop.ikan_gabus || 0) < 12) { score -= 30; feedback = 'Keong mas meledak! Lepaskan ikan gabus!'; }
      else if ((this.pop.ikan_gabus || 0) >= 15 && (this.pop.keong || 0) <= 35) { score += 20; }
    } else if (mid === 8) {
      // Danau M2
      if (!this.pesticideClean) { score -= 45; feedback = 'Eceng gondok tebal menutupi oksigen air danau!'; }
      else { score += 25; }
      if ((this.pop.teratai || 0) < 30) { score -= 20; feedback = 'Pasang penyaring limbah agar danau jernih!'; }
      else if ((this.pop.teratai || 0) >= 40) { score += 15; }
    } else {
      // Sawah (Misi 1 & 2)
      // 1. Cek Padi
      if (this.pop.padi < 30) {`;

if (code.includes(oldHealthStart)) {
  code = code.replace(oldHealthStart, newHealthStart);
  // Also close the else block
  code = code.replace(`this.ecoHealth = Math.max(10, Math.min(100, score));`, `    }
    this.ecoHealth = Math.max(10, Math.min(100, score));`);
  console.log('Patched calculateEcosystemHealth() successfully');
}

// 8. Patch simulationStep() for biomes
const oldSimStep = `      // 1. Jika hama tikus banyak & ular sedikit -> Tikus makan padi
      if (this.pop.tikus > 40 && this.pop.ular < 15 && this.pop.padi > 15) {`;

const newSimStep = `      const mid = this.activeMission.id;

      // Laut simulation dynamics
      if (this.biome === 'laut') {
        if ((this.pop.ikan_kecil || 0) > 45 && (this.pop.hiu || 0) < 8 && (this.pop.karang || 0) > 15) {
          this.pop.karang = Math.max(5, (this.pop.karang || 0) - 2);
          this.showFloatingNotice('🐟 Ikan kecil memakan alga karang! (-2 Karang)', 0xf87171);
          stateChanged = true;
        }
        if ((this.pop.hiu || 0) >= 10 && (this.pop.ikan_kecil || 0) > 30) {
          this.pop.ikan_kecil = Math.max(15, (this.pop.ikan_kecil || 0) - 4);
          this.showFloatingNotice('🦈 Hiu menyeimbangkan ikan kecil! (-4 Ikan)', 0x34d399);
          if (window.soundEngine) window.soundEngine.playChomp();
          stateChanged = true;
        }
      }
      // Hutan simulation dynamics
      else if (this.biome === 'hutan') {
        if ((this.pop.rusa || 0) > 45 && (this.pop.harimau || 0) < 4 && (this.pop.pohon || 0) > 15) {
          this.pop.pohon = Math.max(5, (this.pop.pohon || 0) - 2);
          this.showFloatingNotice('🦌 Rusa memakan tunas pohon rimba! (-2 Pohon)', 0xf87171);
          stateChanged = true;
        }
        if ((this.pop.harimau || 0) >= 5 && (this.pop.rusa || 0) > 35) {
          this.pop.rusa = Math.max(20, (this.pop.rusa || 0) - 4);
          this.showFloatingNotice('🐅 Harimau menjaga kawanan rusa! (-4 Rusa)', 0x34d399);
          if (window.soundEngine) window.soundEngine.playChomp();
          stateChanged = true;
        }
      }
      // Danau simulation dynamics
      else if (this.biome === 'danau') {
        if ((this.pop.keong || 0) > 40 && (this.pop.ikan_gabus || 0) < 12 && (this.pop.teratai || 0) > 15) {
          this.pop.teratai = Math.max(5, (this.pop.teratai || 0) - 2);
          this.showFloatingNotice('🐌 Keong mas memakan daun teratai! (-2 Teratai)', 0xf87171);
          stateChanged = true;
        }
        if ((this.pop.ikan_gabus || 0) >= 15 && (this.pop.keong || 0) > 25) {
          this.pop.keong = Math.max(15, (this.pop.keong || 0) - 4);
          this.showFloatingNotice('🐟 Ikan gabus memangsa keong mas! (-4 Keong)', 0x34d399);
          if (window.soundEngine) window.soundEngine.playChomp();
          stateChanged = true;
        }
      }
      // Sawah simulation dynamics
      // 1. Jika hama tikus banyak & ular sedikit -> Tikus makan padi
      else if (this.pop.tikus > 40 && this.pop.ular < 15 && this.pop.padi > 15) {`;

if (code.includes(oldSimStep)) {
  code = code.replace(oldSimStep, newSimStep);
  console.log('Patched simulationStep() successfully');
}

// 9. Patch storyBeats in createPrologueDialogueBox()
const oldStory = `    if (mId === 1) {`;
const newStory = `    if (mId === 3) {
      storyBeats = [
        { speaker: 'GITA SI DETEKTIF CILIK', text: \`Selamat datang di Samudra Tropis, \${teamName}! Terumbu karang kita sedang terancam karena hiu pemangsa diburu habis!\`, vo: 'vo_prologue_m3' },
        { speaker: 'GITA SI DETEKTIF CILIK', text: \`Tanpa hiu, populasi ikan kecil membludak dan merusak keseimbangan alga karang. Mari kita jaga hiu dan rawat terumbu karang!\`, vo: 'vo_prologue_m3_2' },
        { speaker: 'GITA SI DETEKTIF CILIK', text: \`Tugas \${teamName} adalah melepas minimal 10 hiu dan merawat karang hingga bar kesehatan HIJAU SUBUR!\`, vo: 'vo_prologue_m3_3' }
      ];
    } else if (mId === 4) {
      storyBeats = [
        { speaker: 'GITA SI DETEKTIF CILIK', text: \`Waspada \${teamName}! Suara ledakan bom ikan meremukkan karang dan sampah plastik laut menjerat satwa penyu!\`, vo: 'vo_prologue_m4' },
        { speaker: 'GITA SI DETEKTIF CILIK', text: \`Karang butuh ratusan tahun untuk tumbuh, namun bom manusia menghancurkannya dalam sekejap bersama racun plastik!\`, vo: 'vo_prologue_m4_2' },
        { speaker: 'GITA SI DETEKTIF CILIK', text: \`Bersihkan sampah plastik laut, tetapkan larangan bom ikan, dan kembalikan keindahan samudra kita!\`, vo: 'vo_prologue_m4_3' }
      ];
    } else if (mId === 5) {
      storyBeats = [
        { speaker: 'GITA SI DETEKTIF CILIK', text: \`Halo \${teamName}! Kita berada di Rimba Hujan Tropis Nusantara. Pohon rimba dan kawanan rusa membutuhkan keseimbangan!\`, vo: 'vo_prologue_m5' },
        { speaker: 'GITA SI DETEKTIF CILIK', text: \`Rantai makanan rimba saling bertumpu pada pohon produsen dan Harimau Sumatera sebagai pemuncak rimba!\`, vo: 'vo_prologue_m5_2' },
        { speaker: 'GITA SI DETEKTIF CILIK', text: \`Seimbangkan rusa dan jaga Harimau Sumatera agar hutan tropis kita tetap lestari!\`, vo: 'vo_prologue_m5_3' }
      ];
    } else if (mId === 6) {
      storyBeats = [
        { speaker: 'GITA SI DETEKTIF CILIK', text: \`Gawat darurat \${teamName}! Suara gergaji mesin penebang liar membabat pohon kanopi dan jerat pemburu mengancam Harimau!\`, vo: 'vo_prologue_m6' },
        { speaker: 'GITA SI DETEKTIF CILIK', text: \`Jika rumah hutan rusak, satwa liar terancam punah dan terdesak keluar hutan mencari makan!\`, vo: 'vo_prologue_m6_2' },
        { speaker: 'GITA SI DETEKTIF CILIK', text: \`Lakukan reboisasi pohon, musnahkan jerat pemburu lewat patroli, dan lindungi Harimau Sumatera!\`, vo: 'vo_prologue_m6_3' }
      ];
    } else if (mId === 7) {
      storyBeats = [
        { speaker: 'GITA SI DETEKTIF CILIK', text: \`Selamat datang di Danau Bening, \${teamName}! Bunga teratai dan tanaman air sedang habis digerogoti keong mas!\`, vo: 'vo_prologue_m7' },
        { speaker: 'GITA SI DETEKTIF CILIK', text: \`Ikan gabus pemangsa keong ditangkap habis. Akibatnya, tanaman air produsen danau habis tak bersisa!\`, vo: 'vo_prologue_m7_2' },
        { speaker: 'GITA SI DETEKTIF CILIK', text: \`Lepaskan ikan gabus sahabat danau dan burung bangau untuk menyeimbangkan populasi keong mas!\`, vo: 'vo_prologue_m7_3' }
      ];
    } else if (mId === 8) {
      storyBeats = [
        { speaker: 'GITA SI DETEKTIF CILIK', text: \`Perhatian \${teamName}! Pabrik membuang limbah detergen cair hingga permukaan danau tertutup rapat eceng gondok!\`, vo: 'vo_prologue_m8' },
        { speaker: 'GITA SI DETEKTIF CILIK', text: \`Gulma tebal menghalangi sinar matahari dan menghabiskan oksigen air hingga ikan mati lemas!\`, vo: 'vo_prologue_m8_2' },
        { speaker: 'GITA SI DETEKTIF CILIK', text: \`Angkat eceng gondok berlebih, pasang saringan limbah alami, dan pulihkan air danau menjadi jernih kembali!\`, vo: 'vo_prologue_m8_3' }
      ];
    } else if (mId === 1) {`;

if (code.includes(oldStory)) {
  code = code.replace(oldStory, newStory);
  console.log('Patched storyBeats successfully');
}

fs.writeFileSync(filePath, code, 'utf8');
console.log('SimulationScene.js successfully updated for multi-biome!');
