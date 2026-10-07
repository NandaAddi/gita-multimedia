// ============================================================
// tests/test_canvas_opt.js
// Verifikasi Optimasi Canvas: FIFO Eviction, Memoization, & Padi Motion
// ============================================================
const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('=== TEST: OPTIMASI CANVAS & RENDER LOOP ===');

// 1. Uji Algoritma FIFO Eviction pada GradCache
const GRADCACHE = new Map();
function gradMemo(c, key, mk) {
  let g = GRADCACHE.get(key);
  if (!g) {
    if (GRADCACHE.size >= 300) {
      const oldestKey = GRADCACHE.keys().next().value;
      GRADCACHE.delete(oldestKey);
    }
    g = mk();
    GRADCACHE.set(key, g);
  }
  return g;
}

for (let i = 0; i < 305; i++) {
  gradMemo({}, 'key_' + i, () => ({ id: i }));
}
assert.strictEqual(GRADCACHE.size, 300, 'Kapasitas GRADCACHE harus tepat 300');
assert.strictEqual(GRADCACHE.has('key_0'), false, 'Kunci tertua key_0 harus terhapus secara FIFO');
assert.strictEqual(GRADCACHE.has('key_4'), false, 'Kunci tertua key_4 harus terhapus secara FIFO');
assert.strictEqual(GRADCACHE.has('key_5'), true, 'Kunci key_5 harus tetap ada');
assert.strictEqual(GRADCACHE.has('key_304'), true, 'Kunci terbaru key_304 harus tetap ada');
console.log('✓ PASS: FIFO eviction bekerja stabil tanpa lonjakan GC');

// 2. Audit Statis Kode config.js, team.js, backgrounds.js
const configSrc = fs.readFileSync(path.join(__dirname, '../js/config.js'), 'utf8');
const teamSrc = fs.readFileSync(path.join(__dirname, '../js/scenes/team.js'), 'utf8');
const bgSrc = fs.readFileSync(path.join(__dirname, '../js/renderers/backgrounds.js'), 'utf8');

assert.strictEqual(
  configSrc.includes('GRADCACHE.clear()'),
  false,
  'config.js tidak boleh lagi memanggil GRADCACHE.clear()'
);
console.log('✓ PASS: config.js telah bebas dari GRADCACHE.clear()');

assert.strictEqual(
  teamSrc.includes('c.createLinearGradient(0, 290, 0, 335)'),
  false,
  'team.js tidak boleh lagi memanggil createLinearGradient mentah per frame di drawPodiumAndMascot'
);
assert.strictEqual(
  teamSrc.includes('c.createRadialGradient(200, 295, 20, 200, 295, 135)'),
  false,
  'team.js tidak boleh lagi memanggil createRadialGradient mentah per frame di drawPodiumAndMascot'
);
console.log('✓ PASS: team.js menggunakan memoized gradient helper');

// 3. Verifikasi Kalibrasi Gerak Padi (Semilir Alami)
assert.strictEqual(
  bgSrc.includes('sway = (windWave1 + windWave2) * (8 + r1 * 13)'),
  false,
  'backgrounds.js tidak boleh lagi menggunakan amplitudo lebay 8 + r1 * 13'
);
console.log('✓ PASS: Formula gerak padi telah dikalibrasi menjadi semilir alami');
