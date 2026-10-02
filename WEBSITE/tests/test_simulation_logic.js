// WEBSITE/tests/test_simulation_logic.js
// Automated verification for multi-biome ecological cascade simulation step
const assert = require('assert');

function createDummyScene(ecoId, missionId, initPop, waterLevel = 30) {
  return {
    activeEcosystemId: ecoId,
    activeMission: { id: missionId },
    pop: { ...initPop },
    waterLevel: waterLevel,
    limbahLevel: 60,
    organicWaste: 30,
    notifications: [],
    showFloatingNotice(text, color) {
      this.notifications.push(text);
    }
  };
}

function runEcologicalStep(scene) {
  let stateChanged = false;
  const eco = scene.activeEcosystemId;

  if (eco === 'sawah') {
    // 1. Jika hama tikus banyak & ular sedikit -> Tikus makan padi
    if (scene.pop.tikus > 40 && (scene.pop.ular || 0) < 15 && scene.pop.padi > 15) {
      scene.pop.padi = Math.max(5, scene.pop.padi - 2);
      scene.showFloatingNotice('🐀 Tikus memakan batang padi! (-2 Padi)', 0xf87171);
      stateChanged = true;
    }
    // 2. Jika ular mencukupi -> Ular secara alami memangsa tikus
    if ((scene.pop.ular || 0) >= 20 && scene.pop.tikus > 25) {
      const eatenRats = Math.min(4, scene.pop.tikus - 15);
      if (eatenRats > 0) {
        scene.pop.tikus -= eatenRats;
        scene.showFloatingNotice(`🐍 Ular sawah memangsa tikus! (-${eatenRats} Tikus)`, 0x34d399);
        stateChanged = true;
      }
    }
    // 3. Kekeringan sawah
    if (scene.waterLevel < 35 && scene.pop.padi > 15) {
      scene.pop.padi = Math.max(5, scene.pop.padi - 2);
      scene.showFloatingNotice('☀️ Padi layu karena kekurangan air irigasi! (-2 Padi)', 0xf59e0b);
      stateChanged = true;
    }
  } else if (eco === 'hutan') {
    // 1. Rusa memakan tunas pohon jika pemangsa harimau sedikit
    if ((scene.pop.rusa || 0) > 25 && (scene.pop.harimau || 0) < 6 && (scene.pop.pohon || 0) > 15) {
      scene.pop.pohon = Math.max(5, scene.pop.pohon - 2);
      scene.showFloatingNotice('🦌 Kawanan rusa memakan tunas rimba! (-2 Pohon)', 0xf87171);
      stateChanged = true;
    }
    // 2. Harimau menjaga keseimbangan dan memangsa rusa
    if ((scene.pop.harimau || 0) >= 8 && (scene.pop.rusa || 0) > 20) {
      const eatenPrey = Math.min(3, scene.pop.rusa - 15);
      if (eatenPrey > 0) {
        scene.pop.rusa -= eatenPrey;
        scene.showFloatingNotice(`🐅 Harimau menjaga rimba dan memangsa rusa! (-${eatenPrey} Rusa)`, 0x34d399);
        stateChanged = true;
      }
    }
    // 3. Pohon mengering saat kemarau rimba
    if (scene.waterLevel < 35 && (scene.pop.pohon || 0) > 15) {
      scene.pop.pohon = Math.max(5, scene.pop.pohon - 2);
      scene.showFloatingNotice('☀️ Pohon rimba layu kekurangan mata air! (-2 Pohon)', 0xf59e0b);
      stateChanged = true;
    }
  } else if (eco === 'sungai') {
    // 1. Gulma lebat menutup permukaan air, kadar oksigen anjlok
    if ((scene.pop.gulma || 0) > 40 && (scene.pop.ikan || 0) > 20) {
      const lostFish = Math.min(3, scene.pop.ikan - 15);
      if (lostFish > 0) {
        scene.pop.ikan -= lostFish;
        scene.showFloatingNotice(`🌿 Eceng gondok menutup air! Ikan lemas kekurangan oksigen! (-${lostFish} Ikan)`, 0xf87171);
        stateChanged = true;
      }
    }
    // 2. Air hulu surut membuat teratai layu
    if (scene.waterLevel < 35 && (scene.pop.teratai || 0) > 10) {
      scene.pop.teratai = Math.max(5, scene.pop.teratai - 2);
      scene.showFloatingNotice('☀️ Aliran surut! Tanaman air teratai layu! (-2 Teratai)', 0xf59e0b);
      stateChanged = true;
    }
    // 3. Limbah kimia beracun mengikis populasi ikan
    if (scene.limbahLevel > 35 && (scene.pop.ikan || 0) > 15) {
      scene.pop.ikan = Math.max(5, scene.pop.ikan - 2);
      scene.showFloatingNotice('🧪 Limbah kimia meracuni air! Ikan kecil berkurang! (-2 Ikan)', 0xf87171);
      stateChanged = true;
    }
  } else if (eco === 'laut') {
    // 1. Karang memutih dan rusak membuat ikan karang berkurang
    if ((scene.pop.karang || 0) < 30 && (scene.pop.ikan || 0) > 20) {
      const lostFish = Math.min(3, scene.pop.ikan - 15);
      if (lostFish > 0) {
        scene.pop.ikan -= lostFish;
        scene.showFloatingNotice(`🪸 Karang memutih! Ikan karang kehilangan rumah! (-${lostFish} Ikan)`, 0xf87171);
        stateChanged = true;
      }
    }
    // 2. Hiu memangsa ikan secara alami untuk menyeimbangkan samudra
    if ((scene.pop.hiu || 0) >= 3 && (scene.pop.ikan || 0) > 35) {
      const eatenFish = Math.min(4, scene.pop.ikan - 25);
      if (eatenFish > 0) {
        scene.pop.ikan -= eatenFish;
        scene.showFloatingNotice(`🦈 Hiu menjaga keseimbangan samudra! (-${eatenFish} Ikan)`, 0x34d399);
        stateChanged = true;
      }
    }
  }

  return stateChanged;
}

// 1. Test Sawah
const sawahScene = createDummyScene('sawah', 'sawah_m1', { padi: 20, tikus: 50, ular: 5 }, 20);
assert.strictEqual(runEcologicalStep(sawahScene), true, 'Sawah step should trigger');
assert.strictEqual(sawahScene.pop.padi, 16, 'Padi should decrease by 4 (tikus + drought)');
console.log('✓ Test Bioma Sawah PASS');

// 2. Test Hutan Tropis
const hutanScene = createDummyScene('hutan', 'hutan_m1', { pohon: 25, rusa: 30, harimau: 2 }, 20);
assert.strictEqual(runEcologicalStep(hutanScene), true, 'Hutan step should trigger');
assert.strictEqual(hutanScene.pop.pohon, 21, 'Pohon should decrease by 4 (rusa + drought)');
console.log('✓ Test Bioma Hutan PASS');

// 3. Test Sungai Air Tawar
const sungaiScene = createDummyScene('sungai', 'sungai_m1', { teratai: 15, gulma: 60, ikan: 30 }, 25);
assert.strictEqual(runEcologicalStep(sungaiScene), true, 'Sungai step should trigger');
assert.strictEqual(sungaiScene.pop.ikan, 25, 'Ikan should decrease by 5 due to gulma (-3) and limbah (-2)');
assert.strictEqual(sungaiScene.pop.teratai, 13, 'Teratai should decrease by 2 due to drought');
console.log('✓ Test Bioma Sungai PASS');

// 4. Test Laut Terumbu Karang
const lautScene = createDummyScene('laut', 'laut_m1', { karang: 20, ikan: 40, hiu: 4 }, 80);
assert.strictEqual(runEcologicalStep(lautScene), true, 'Laut step should trigger');
assert.strictEqual(lautScene.pop.ikan, 33, 'Ikan should decrease (bleaching -3 and hiu -4)');
console.log('✓ Test Bioma Laut PASS');

console.log('\n🎉 ALL 4 BIOME SIMULATION LOGIC TESTS PASSED SUCCESSFULLY!');
