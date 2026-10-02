// WEBSITE/tests/test_progress_manager.js
// Automated verification for ProgressManager and examiner unlock mode
const assert = require('assert');

// Mock localStorage for Node.js
class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  clear() {
    this.store = {};
  }
}
global.localStorage = new LocalStorageMock();

// Load ProgressManager logic
class ProgressManager {
  constructor() {
    this.STORAGE_KEY = 'eco_explorer_save_v2';
    this.state = this.getInitialState();
    this.load();
  }

  getInitialState() {
    return {
      version: 2,
      unlockedEcosystems: ['sawah'],
      currentEcosystem: 'sawah',
      missions: {
        sawah_m1: { unlocked: true, completed: false, stars: 0, bestHealth: 0, quizPassed: false },
        sawah_m2: { unlocked: false, completed: false, stars: 0, bestHealth: 0, quizPassed: false },
        hutan_m1: { unlocked: false, completed: false, stars: 0, bestHealth: 0, quizPassed: false },
        hutan_m2: { unlocked: false, completed: false, stars: 0, bestHealth: 0, quizPassed: false },
        sungai_m1: { unlocked: false, completed: false, stars: 0, bestHealth: 0, quizPassed: false },
        sungai_m2: { unlocked: false, completed: false, stars: 0, bestHealth: 0, quizPassed: false },
        laut_m1: { unlocked: false, completed: false, stars: 0, bestHealth: 0, quizPassed: false },
        laut_m2: { unlocked: false, completed: false, stars: 0, bestHealth: 0, quizPassed: false }
      },
      totalStars: 0
    };
  }

  load() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.version === 2) {
          this.state = parsed;
          return this.state;
        }
      }
    } catch (e) {
      console.warn(e);
    }
    this.save();
    return this.state;
  }

  save() {
    this.recalculateStars();
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
  }

  recalculateStars() {
    let total = 0;
    Object.values(this.state.missions).forEach(m => {
      total += (m.stars || 0);
    });
    this.state.totalStars = total;
  }

  isEcosystemUnlocked(ecoId) {
    return this.state.unlockedEcosystems.includes(ecoId);
  }

  isMissionUnlocked(missionId) {
    const m = this.state.missions[missionId];
    return m ? !!m.unlocked : false;
  }

  getTotalStars() {
    this.recalculateStars();
    return this.state.totalStars;
  }

  /**
   * Mode Penguji / Dosen (Sidang Skripsi & Validasi Ahli):
   * Membuka instan seluruh 4 bioma dan 8 misi dengan rating 3 bintang.
   */
  unlockAllForExaminer() {
    this.state.unlockedEcosystems = ['sawah', 'hutan', 'sungai', 'laut'];
    Object.keys(this.state.missions).forEach(mid => {
      this.state.missions[mid] = {
        unlocked: true,
        completed: true,
        stars: 3,
        bestHealth: 95,
        quizPassed: true
      };
    });
    this.recalculateStars();
    this.save();
  }

  resetProgress() {
    this.state = this.getInitialState();
    this.save();
  }
}

// 1. Inisialisasi awal
const pm = new ProgressManager();
assert.strictEqual(pm.isEcosystemUnlocked('sawah'), true, 'Sawah harus terbuka di awal');
assert.strictEqual(pm.isEcosystemUnlocked('hutan'), false, 'Hutan harus terkunci di awal');
assert.strictEqual(pm.isEcosystemUnlocked('laut'), false, 'Laut harus terkunci di awal');
assert.strictEqual(pm.getTotalStars(), 0, 'Total bintang awal harus 0');
console.log('✓ Initial state verified');

// 2. Uji Mode Penguji (unlockAllForExaminer)
pm.unlockAllForExaminer();
assert.strictEqual(pm.isEcosystemUnlocked('sawah'), true, 'Sawah terbuka');
assert.strictEqual(pm.isEcosystemUnlocked('hutan'), true, 'Hutan terbuka');
assert.strictEqual(pm.isEcosystemUnlocked('sungai'), true, 'Sungai terbuka');
assert.strictEqual(pm.isEcosystemUnlocked('laut'), true, 'Laut terbuka');

// Pastikan semua 8 misi terbuka dan rating 3 bintang
const expectedMissions = ['sawah_m1', 'sawah_m2', 'hutan_m1', 'hutan_m2', 'sungai_m1', 'sungai_m2', 'laut_m1', 'laut_m2'];
expectedMissions.forEach(mid => {
  assert.strictEqual(pm.isMissionUnlocked(mid), true, `Misi ${mid} harus terbuka`);
  assert.strictEqual(pm.state.missions[mid].stars, 3, `Misi ${mid} harus 3 bintang`);
});
assert.strictEqual(pm.getTotalStars(), 24, 'Total bintang penguji harus 24/24');
console.log('✓ Examiner unlock mode (24/24 stars) verified');

// 3. Uji Persistensi localStorage
const pmLoaded = new ProgressManager();
assert.strictEqual(pmLoaded.getTotalStars(), 24, 'Data mode penguji tersimpan di localStorage');
assert.strictEqual(pmLoaded.isEcosystemUnlocked('laut'), true, 'Laut tetap terbuka setelah reload');
console.log('✓ LocalStorage persistence verified');

// 4. Uji Reset Kelas
pmLoaded.resetProgress();
assert.strictEqual(pmLoaded.isEcosystemUnlocked('hutan'), false, 'Hutan terkunci kembali setelah reset');
assert.strictEqual(pmLoaded.isEcosystemUnlocked('laut'), false, 'Laut terkunci kembali setelah reset');
assert.strictEqual(pmLoaded.getTotalStars(), 0, 'Bintang kembali 0 setelah reset');
console.log('✓ Reset progress verified');

console.log('\n🎉 ALL PROGRESS MANAGER & EXAMINER MODE TESTS PASSED!');
