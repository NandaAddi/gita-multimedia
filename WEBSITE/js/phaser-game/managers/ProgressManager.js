/**
 * ECO-EXPLORER: PROGRESS & UNLOCK MANAGER
 * Handles persistent state via localStorage with in-memory fallback.
 * Enforces sequential linear lock:
 * Sawah (M1 -> M2) -> Hutan (M1 -> M2) -> Sungai (M1 -> M2) -> Laut (M1 -> M2)
 */

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
      console.warn('[ProgressManager] localStorage load failed, using memory state:', e);
    }
    this.save();
    return this.state;
  }

  save() {
    try {
      this.recalculateStars();
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('[ProgressManager] localStorage save failed:', e);
    }
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

  getMissionData(missionId) {
    return this.state.missions[missionId] || null;
  }

  getEcosystemStars(ecoId) {
    const m1 = this.state.missions[`${ecoId}_m1`]?.stars || 0;
    const m2 = this.state.missions[`${ecoId}_m2`]?.stars || 0;
    return m1 + m2;
  }

  getTotalStars() {
    this.recalculateStars();
    return this.state.totalStars;
  }

  /**
   * Records a mission completion, evaluates stars, and unlocks subsequent content.
   * @param {string} missionId - e.g. 'sawah_m1'
   * @param {number} stars - 1, 2, or 3
   * @param {number} health - ecosystem health percentage (0-100)
   * @param {boolean} quizPassed - whether the quiz was answered correctly
   * @returns {object} - updated mission data
   */
  saveMissionResult(missionId, stars, health, quizPassed) {
    if (!this.state.missions[missionId]) {
      this.state.missions[missionId] = { unlocked: true, completed: false, stars: 0, bestHealth: 0, quizPassed: false };
    }

    const current = this.state.missions[missionId];
    current.completed = true;
    current.stars = Math.max(current.stars || 0, stars);
    current.bestHealth = Math.max(current.bestHealth || 0, health);
    if (quizPassed) current.quizPassed = true;

    // Progression Unlock Rules
    const [ecoId, mNum] = missionId.split('_');

    if (mNum === 'm1') {
      // Completing Misi 1 unlocks Misi 2 of the same ecosystem
      const nextMissionId = `${ecoId}_m2`;
      if (this.state.missions[nextMissionId]) {
        this.state.missions[nextMissionId].unlocked = true;
      }
    } else if (mNum === 'm2') {
      // Completing Misi 2 unlocks the NEXT ecosystem in sequence
      const sequence = ['sawah', 'hutan', 'sungai', 'laut'];
      const currentIndex = sequence.indexOf(ecoId);
      if (currentIndex !== -1 && currentIndex < sequence.length - 1) {
        const nextEcoId = sequence[currentIndex + 1];
        if (!this.state.unlockedEcosystems.includes(nextEcoId)) {
          this.state.unlockedEcosystems.push(nextEcoId);
        }
        // Unlock Misi 1 of the new ecosystem
        const nextEcoFirstMission = `${nextEcoId}_m1`;
        if (this.state.missions[nextEcoFirstMission]) {
          this.state.missions[nextEcoFirstMission].unlocked = true;
        }
      }
    }

    this.save();
    return current;
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
    console.log('[ProgressManager] 🎓 Mode Penguji Aktif: Seluruh 4 Bioma & 8 Misi Terbuka!');
  }

  resetProgress() {
    this.state = this.getInitialState();
    this.save();
    console.log('[ProgressManager] Progress reset to initial state.');
  }
}

window.progressManager = new ProgressManager();
