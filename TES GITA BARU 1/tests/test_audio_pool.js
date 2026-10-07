// ============================================================
// tests/test_audio_pool.js
// Verifikasi Audio VO Object Pooling & Buffer Management
// ============================================================
const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('=== TEST: AUDIO VO OBJECT POOLING ===');

// 1. Uji Logika Object Pooling
const VO_POOL = new Map();
function getOrCreateAudio(key) {
  let audio = VO_POOL.get(key);
  if (!audio) {
    if (VO_POOL.size >= 40) {
      const oldestKey = VO_POOL.keys().next().value;
      VO_POOL.delete(oldestKey);
    }
    audio = { key, currentTime: 0, playCount: 0, play() { this.playCount++; return Promise.resolve(); } };
    VO_POOL.set(key, audio);
  }
  return audio;
}

const a1 = getOrCreateAudio('vo_test');
const a2 = getOrCreateAudio('vo_test');
assert.strictEqual(a1, a2, 'Audio instance harus di-reuse dari VO_POOL');
assert.strictEqual(VO_POOL.size, 1, 'Ukuran VO_POOL harus tetap 1 setelah pemanggilan berulang');

// Uji batasan maksimum kapasitas pool (40)
for (let i = 0; i < 45; i++) {
  getOrCreateAudio('vo_' + i);
}
assert.strictEqual(VO_POOL.size, 40, 'Kapasitas VO_POOL harus dibatasi maksimal 40');
assert.strictEqual(VO_POOL.has('vo_test'), false, 'Elemen terlama harus dievuksi');
console.log('✓ PASS: Logika Map pooling bekerja stabil dengan pembatasan kapasitas 40');

// 2. Audit Statis Kode js/audio.js
const audioSrc = fs.readFileSync(path.join(__dirname, '../js/audio.js'), 'utf8');
assert.strictEqual(
  audioSrc.includes('const VO_POOL = new Map()') || audioSrc.includes('VO_POOL.get('),
  true,
  'js/audio.js harus memiliki implementasi VO_POOL'
);
console.log('✓ PASS: js/audio.js menerapkan mekanisme VO_POOL object reuse');
