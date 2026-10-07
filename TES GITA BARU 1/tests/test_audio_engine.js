// ============================================================
// tests/test_audio_engine.js
// Automated Test Suite for Exclusive Monophonic VO, Auto-Ducking,
// & Global SFX Anti-Double Sound Engine
// ============================================================
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== TEST: COMPREHENSIVE AUDIO ENGINE AUDIT ===');

// Mock Browser Environment
const audioInstances = [];
class MockAudio {
  constructor(src) {
    this.src = src;
    this.volume = 0.5;
    this.paused = true;
    this.currentTime = 0;
    this.loop = false;
    this.onended = null;
    this.onerror = null;
    audioInstances.push(this);
  }
  play() {
    this.paused = false;
    return Promise.resolve();
  }
  pause() {
    this.paused = true;
  }
}

let oscillatorCount = 0;
class MockGain {
  constructor() {
    this.gain = {
      value: 1,
      setValueAtTime() {},
      linearRampToValueAtTime() {},
      exponentialRampToValueAtTime() {}
    };
  }
  connect() {}
}
class MockOscillator {
  constructor() {
    this.type = 'sine';
    this.frequency = { setValueAtTime() {} };
  }
  connect() {}
  start() { oscillatorCount++; }
  stop() {}
}
class MockAudioContext {
  constructor() {
    this.state = 'running';
    this.currentTime = 0;
    this.destination = {};
  }
  createOscillator() { return new MockOscillator(); }
  createGain() { return new MockGain(); }
  resume() { return Promise.resolve(); }
  suspend() { return Promise.resolve(); }
}

const sandbox = {
  window: {},
  Audio: MockAudio,
  AudioContext: MockAudioContext,
  webkitAudioContext: MockAudioContext,
  performance: { now: () => Date.now() },
  console: console,
  setInterval: setInterval,
  clearInterval: clearInterval,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  G: { bgmVol: 0.5 },
  saveG: () => {},
  els: () => [],
  modal: () => ({ querySelector: () => ({ oninput: null, onclick: null }) }),
  ic: () => ''
};

vm.createContext(sandbox);
const audioCode = fs.readFileSync(path.join(__dirname, '../js/audio.js'), 'utf8');
vm.runInContext(audioCode, sandbox);

// Activate AudioContext in sandbox
vm.runInContext('audioReady = true; soundOn = true; AC = new AudioContext();', sandbox);

// TEST 1: Object Pooling Exists
const VO_POOL = vm.runInContext('VO_POOL', sandbox);
assert.ok(VO_POOL.size !== undefined, 'VO_POOL harus Map');
console.log('  OK [1] VO_POOL Map terdefinisi');

// TEST 2: Monophonic Exclusive VO Playback (Zero Audio Overlap)
vm.runInContext("playVO('vo_test_1');", sandbox);
const aud1 = vm.runInContext('currentVO', sandbox);
assert.ok(aud1, 'Audio 1 harus aktif');
assert.strictEqual(aud1.paused, false, 'Audio 1 harus sedang bermain');

// Putar VO ke-2: Audio 1 harus seketika dipause dan tidak boleh bertumpuk!
vm.runInContext("playVO('vo_test_2');", sandbox);
const aud2 = vm.runInContext('currentVO', sandbox);
assert.ok(aud2, 'Audio 2 harus aktif');
assert.notStrictEqual(aud1, aud2, 'Audio instance harus berbeda untuk key berbeda');
assert.strictEqual(aud1.paused, true, 'Audio 1 harus otomatis di-pause seketika saat Audio 2 diputar (Monofonik)');
assert.strictEqual(aud2.paused, false, 'Audio 2 harus bermain');
console.log('  OK [2] Monofonik eksklusif: Audio 1 otomatis mati saat Audio 2 masuk');

// TEST 3: stopVO() Menghentikan Seluruh Suara & Reset
vm.runInContext("stopVO();", sandbox);
assert.strictEqual(vm.runInContext('currentVO', sandbox), null, 'currentVO harus null setelah stopVO()');
assert.strictEqual(aud2.paused, true, 'Audio 2 harus di-pause setelah stopVO()');
console.log('  OK [3] stopVO() menghentikan audio aktif dan mereset status');

// TEST 4: Auto-Ducking BGM
vm.runInContext("initBGM();", sandbox);
const bgm = vm.runInContext("bgmAudio", sandbox);
assert.ok(bgm, 'BGM audio harus terinisialisasi');
assert.strictEqual(bgm.volume, 0.5, 'Volume awal BGM harus 0.5');

// Mainkan VO: BGM harus ducking (mengecil ke target ~0.10)
vm.runInContext("duckBGM(true);", sandbox);
setTimeout(() => {
  // Verifikasi ducking berjalan
  assert.ok(bgm.volume < 0.35, 'Volume BGM harus mengecil saat duckBGM(true) dipanggil');
  console.log('  OK [4] Auto-Ducking BGM meredupkan volume musik saat narasi Gita berbicara');

  // Kembalikan ducking
  vm.runInContext("duckBGM(false);", sandbox);
  setTimeout(() => {
    assert.ok(bgm.volume > 0.40, 'Volume BGM harus pulih kembali setelah duckBGM(false)');
    console.log('  OK [5] BGM pulih ke volume normal setelah narasi selesai');
  }, 350);
}, 200);

// TEST 5: SFX Anti-Double Chime / Throttle Cooldown
const oscStart = oscillatorCount;
vm.runInContext("sfx.chime();", sandbox);
const oscAfterFirst = oscillatorCount;
assert.ok(oscAfterFirst > oscStart, 'Chime pertama harus membunyikan osilator');

// Panggilan chime kedua dalam jeda < 50ms harus di-throttle (anti-double chime)
vm.runInContext("sfx.chime();", sandbox);
assert.strictEqual(oscillatorCount, oscAfterFirst, 'Chime kedua yang terlalu cepat harus ditahan oleh throttle (Anti-Double Chime)');
console.log('  OK [6] SFX Anti-Double Chime: Panggilan chime beruntun berhasil di-throttle');

// TEST 6: SFX Grow / Wither / Flee Throttle
const growStart = oscillatorCount;
vm.runInContext("sfx.grow();", sandbox);
const growAfterFirst = oscillatorCount;
vm.runInContext("sfx.grow();", sandbox);
vm.runInContext("sfx.grow();", sandbox);
assert.strictEqual(oscillatorCount, growAfterFirst, 'sfx.grow berulang dalam tick yang sama harus di-throttle ke 1 nada');
console.log('  OK [7] SFX Organisme: sfx.grow multi-spesies berhasil di-throttle');

setTimeout(() => {
  console.log('\nSEMUA PENGUJIAN AUDIO ENGINE LOLOS DENGAN SEMPURNA (100% PASS)!');
}, 600);
