const fs = require('fs');
const vm = require('vm');

const s = { window: {}, document: { querySelector: () => null, querySelectorAll: () => [] } };
vm.createContext(s);
vm.runInContext(
  fs.readFileSync('js/config.js', 'utf8') + ';' +
  fs.readFileSync('js/data/ecosystems.js', 'utf8') + ';' +
  fs.readFileSync('js/data/missions.js', 'utf8') +
  '; this.MISSIONS = MISSIONS; this.cl = cl; this.c01 = c01;',
  s
);

const missions = s.MISSIONS;
console.log('Total missions to audit:', missions.length);

const results = [];

// Heuristic Solver for a mission:
// State S, action quotas remaining.
// Each day: tick(S). Then evaluate possible actions.
// If any target not met, pick action that most improves unmet targets or health.
// Run up to par days.
for (const m of missions) {
  const par = m.par || 25;
  const initialS = Object.assign({}, m.init);
  const initialHP = m.health(initialS);

  // Strategy 1: Passive (0 action taken)
  let S_passive = Object.assign({}, m.init);
  for (let d = 1; d <= par; d++) {
    m.tick(S_passive);
    S_passive.health = m.health(S_passive);
  }

  // Strategy 2: Greedy / Intelligent Solver
  // We explore state transitions using BFS/greedy search over quota combinations
  let S_active = Object.assign({}, m.init);
  const quotas = m.actions.map(a => a.quota || 3);
  let winDay = null;
  let maxHP = initialHP;
  let history = [];

  for (let d = 1; d <= par; d++) {
    m.tick(S_active);
    S_active.health = m.health(S_active);

    // Check targets before action
    let tStatus = m.targets.map(t => t.c(S_active));
    if (tStatus.every(Boolean)) {
      winDay = d;
      maxHP = Math.max(maxHP, S_active.health);
      break;
    }

    // Pick best action among available
    let bestActionIdx = -1;
    let bestScore = -9999;
    let bestNextS = null;

    for (let i = 0; i < m.actions.length; i++) {
      if (quotas[i] > 0) {
        // Clone state and test effect
        let testS = Object.assign({}, S_active);
        m.actions[i].fx(testS);
        testS.health = m.health(testS);
        let targetsPassed = m.targets.filter(t => t.c(testS)).length;
        // Score: weight targets heavily, then health
        let score = targetsPassed * 100 + testS.health;
        if (score > bestScore) {
          bestScore = score;
          bestActionIdx = i;
          bestNextS = testS;
        }
      }
    }

    // Apply best action if it improves situation or if health needs boost
    if (bestActionIdx !== -1 && bestScore > (m.targets.filter(t => t.c(S_active)).length * 100 + S_active.health)) {
      quotas[bestActionIdx]--;
      S_active = bestNextS;
      history.push({ day: d, action: m.actions[bestActionIdx].id });
    }

    S_active.health = m.health(S_active);
    maxHP = Math.max(maxHP, S_active.health);
    tStatus = m.targets.map(t => t.c(S_active));
    if (tStatus.every(Boolean)) {
      winDay = d;
      break;
    }
  }

  // Also test exhaustive action burst if greedy failed
  let burstWon = false;
  let burstWinDay = null;
  let burstMaxHP = 0;
  if (!winDay) {
    // Try spread action every 2 days
    let S_burst = Object.assign({}, m.init);
    let bQuotas = m.actions.map(a => a.quota || 3);
    for (let d = 1; d <= par; d++) {
      m.tick(S_burst);
      // cycle actions
      for (let i = 0; i < m.actions.length; i++) {
        if (bQuotas[i] > 0 && d % 2 === 0) {
          bQuotas[i]--;
          m.actions[i].fx(S_burst);
          break;
        }
      }
      S_burst.health = m.health(S_burst);
      burstMaxHP = Math.max(burstMaxHP, S_burst.health);
      if (m.targets.every(t => t.c(S_burst))) {
        burstWon = true;
        burstWinDay = d;
        break;
      }
    }
  }

  results.push({
    id: m.id,
    title: m.title,
    par: par,
    initHP: initialHP,
    passiveFinalHP: S_passive.health,
    winDay: winDay || (burstWon ? burstWinDay : null),
    maxHP: Math.max(maxHP, burstMaxHP),
    won: Boolean(winDay || burstWon),
    finalState: S_active,
    unmetTargets: m.targets.filter(t => !t.c(S_active)).map(t => t.l)
  });
}

console.log('\n=== HASIL AUDIT SIMULASI 16 MISI ===');
results.forEach(r => {
  const statusStr = r.won ? `[PASS - Win Day ${r.winDay}, Max HP ${r.maxHP}%]` : `[FAIL - UNWINNABLE! Max HP ${r.maxHP}%, Unmet: ${r.unmetTargets.join('; ')}]`;
  console.log(`${r.id.padEnd(10)} | Par: ${r.par} | Init HP: ${r.initHP}% | ${statusStr}`);
});
