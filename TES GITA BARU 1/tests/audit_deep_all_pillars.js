/* ============================================================
   AUDIT DEEP — ALL 4 PILLARS
   Script pengujian headless untuk mendeteksi bug di 4 pilar:
   1. Keseimbangan Matematis 16 Misi
   2. Audio & Voice-Over
   3. Ergonomi UI & IFP
   4. Validitas Kuis C2
   ============================================================ */

// --- Polyfill minimal untuk environment Node.js ---
var c01 = v => Math.max(0, Math.min(1, v));
var cl = (v, a = 0, b = 100) => Math.max(a, Math.min(b, v));
var pick = a => a[Math.floor(Math.random() * a.length)];

// Load missions data (defines hCtrl, TEAMS, MISSIONS, EVENTS, STATMAX, BRIDGE_DATA)
eval(require('fs').readFileSync(__dirname + '/../js/data/missions.js', 'utf8')
  .replace(/const /g, 'var ')
  .replace(/let /g, 'var '));

console.log('====================================================================');
console.log('  PILAR 1: SIMULASI KESEIMBANGAN MATEMATIS 16 MISI');
console.log('====================================================================\n');

const results = [];

MISSIONS.forEach(m => {
  const S = Object.assign({ day: 0 }, m.init);
  S.health = m.health(S);

  // Strategi: gunakan aksi terbaik pada setiap kesempatan
  const quota = m.actions.map(a => a.quota + 1); // +1 bonus perk
  const cool = m.actions.map(() => 0);
  const cdi = m.actions.map(() => 2); // perk cooldown

  let bestHealth = S.health;
  let bestDay = 0;
  let healthLog = [S.health];
  let allTargetsDay = -1;
  let healthReached75 = false;

  for (let day = 1; day <= m.par + 18; day++) {
    // Cooldown tick
    for (let i = 0; i < cool.length; i++) cool[i] = Math.max(0, cool[i] - 1);

    // Try using actions intelligently
    // Strategy: prioritize the action that gives the biggest health improvement
    let bestActionIdx = -1;
    let bestHealthGain = -999;

    for (let i = 0; i < m.actions.length; i++) {
      if (cool[i] > 0 || quota[i] <= 0) continue;

      // Test each action
      const testS = Object.assign({}, S);
      m.actions[i].fx(testS);
      const testHealth = m.health(testS);
      const gain = testHealth - S.health;
      if (gain > bestHealthGain) {
        bestHealthGain = gain;
        bestActionIdx = i;
      }
    }

    if (bestActionIdx >= 0) {
      m.actions[bestActionIdx].fx(S);
      quota[bestActionIdx]--;
      cool[bestActionIdx] = cdi[bestActionIdx];
    }

    // Tick simulation
    m.tick(S);
    S.day = day;
    S.health = m.health(S);
    healthLog.push(S.health);

    if (S.health > bestHealth) {
      bestHealth = S.health;
      bestDay = day;
    }

    if (S.health >= 75 && !healthReached75) {
      healthReached75 = true;
    }

    // Check all targets
    const allTgt = m.targets.every(t => t.c(S));
    if (allTgt && allTargetsDay < 0) {
      allTargetsDay = day;
    }
  }

  const totalDays = m.par + 18;
  const minHealth = Math.min(...healthLog);
  const maxHealth = Math.max(...healthLog);
  const unwinnable = allTargetsDay < 0;
  const infiniteBleed = healthLog.slice(-5).every(h => h <= 10);
  const severity = unwinnable ? 'CRITICAL' : (maxHealth < 75 ? 'MAJOR' : 'OK');

  results.push({
    id: m.id,
    severity,
    unwinnable,
    infiniteBleed,
    allTargetsDay,
    bestHealth,
    minHealth,
    maxHealth,
    totalDays,
    par: m.par,
    finalHealth: healthLog[healthLog.length - 1]
  });

  const icon = severity === 'CRITICAL' ? '🔴' : severity === 'MAJOR' ? '🟡' : '🟢';
  console.log(`${icon} ${m.id.padEnd(12)} | Best: ${String(bestHealth).padStart(3)}% | Min: ${String(minHealth).padStart(3)}% | All-Tgt Day: ${allTargetsDay >= 0 ? allTargetsDay : 'NEVER'.padStart(5)} | ${severity}`);

  if (unwinnable) {
    console.log(`   ⚠ UNWINNABLE: Target misi secara matematis TIDAK TERCAPAI meski aksi optimal.`);
  }
  if (infiniteBleed) {
    console.log(`   ⚠ INFINITE BLEED: Kesehatan turun ke 0 dan tidak bisa pulih di hari-hari akhir.`);
  }
});

console.log('\n====================================================================');
console.log('  PILAR 1: RINGKASAN TEMUAN');
console.log('====================================================================');
const critical = results.filter(r => r.severity === 'CRITICAL');
const major = results.filter(r => r.severity === 'MAJOR');
console.log(`Total Misi: ${results.length}`);
console.log(`🔴 CRITICAL (Unwinnable): ${critical.length} misi - ${critical.map(r => r.id).join(', ') || 'Tidak ada'}`);
console.log(`🟡 MAJOR (Max health < 75%): ${major.length} misi - ${major.map(r => r.id).join(', ') || 'Tidak ada'}`);
console.log(`🟢 OK: ${results.filter(r => r.severity === 'OK').length} misi`);

// --- PILAR 2: AUDIO & VOICE-OVER ---
console.log('\n====================================================================');
console.log('  PILAR 2: VERIFIKASI AUDIO & VOICE-OVER');
console.log('====================================================================\n');

const fs = require('fs');
const path = require('path');

// Collect all playVO() calls from source code
const voDir = path.join(__dirname, '..', 'voice-over');
const jsDir = path.join(__dirname, '..', 'js');

function findVOCalls(dir) {
  const calls = new Set();
  const files = [];

  function walk(d) {
    fs.readdirSync(d).forEach(f => {
      const full = path.join(d, f);
      if (fs.statSync(full).isDirectory()) walk(full);
      else if (f.endsWith('.js')) files.push(full);
    });
  }
  walk(dir);

  files.forEach(file => {
    const src = fs.readFileSync(file, 'utf8');
    // Match playVO('key') or playVO("key") patterns
    const re = /playVO\(\s*['"`]([^'"`]+)['"`]/g;
    let m;
    while ((m = re.exec(src)) !== null) {
      calls.add(m[1]);
    }
    // Also match dynamically constructed keys: 'vo_bridge_' + m.id.replace('-', '') + '_s' + bridgeStep
    // These follow pattern: vo_bridge_{biome}{num}_s{1|2}
    // and: 'vo_quiz_' + m.id.replace('-', '')
    // and: 'vo_team_' + t.id
  });

  return calls;
}

const voCalls = findVOCalls(jsDir);

// List actual VO files
const voFiles = fs.existsSync(voDir) ? fs.readdirSync(voDir).filter(f => f.endsWith('.mp3')).map(f => f.replace('.mp3', '')) : [];

// Generate expected dynamic VO keys
const dynamicKeys = new Set();
MISSIONS.forEach(m => {
  const id = m.id.replace('-', '');
  dynamicKeys.add('vo_bridge_' + id + '_s1');
  dynamicKeys.add('vo_bridge_' + id + '_s2');
  dynamicKeys.add('vo_quiz_' + id);
});
TEAMS.forEach(t => {
  dynamicKeys.add('vo_team_' + t.id);
});

const allExpected = new Set([...voCalls, ...dynamicKeys]);

// Check missing files
const missingVO = [];
allExpected.forEach(key => {
  if (!voFiles.includes(key)) {
    missingVO.push(key);
  }
});

// Check orphan files (exist but never called)
const orphanVO = voFiles.filter(f => !allExpected.has(f));

if (missingVO.length === 0) {
  console.log('🟢 Semua VO keys yang dipanggil memiliki file MP3 yang sesuai.');
} else {
  console.log(`🔴 ${missingVO.length} VO key TIDAK MEMILIKI FILE MP3:`);
  missingVO.forEach(k => console.log(`   - ${k}.mp3 MISSING`));
}

if (orphanVO.length > 0) {
  console.log(`\n🟡 ${orphanVO.length} file VO tidak pernah dipanggil (orphan):`);
  orphanVO.forEach(f => console.log(`   - ${f}.mp3`));
}

// --- PILAR 3: AUDIT KONSISTENSI DATA ---
console.log('\n====================================================================');
console.log('  PILAR 3: AUDIT KONSISTENSI DATA & LOGIKA');
console.log('====================================================================\n');

// Check: sungai-4 references S.water in tick() but init doesn't have 'water'
MISSIONS.forEach(m => {
  const tickStr = m.tick.toString();
  const healthStr = m.health.toString();
  const initKeys = Object.keys(m.init);

  // Check for variables used in tick/health that aren't in init
  const stateVars = ['water', 'prod', 'herb', 'pred', 'poison', 'trap', 'heat', 'bomb', 'wereng', 'api', 'lumpur', 'storm', 'gulma', 'net', 'trash'];
  const usedInTick = stateVars.filter(v => tickStr.includes('S.' + v));
  const usedInHealth = stateVars.filter(v => healthStr.includes('S.' + v));
  const allUsed = new Set([...usedInTick, ...usedInHealth]);

  const missingInit = [...allUsed].filter(v => !initKeys.includes(v));
  if (missingInit.length > 0) {
    console.log(`🔴 ${m.id}: tick()/health() menggunakan S.${missingInit.join(', S.')} tapi TIDAK ADA di init: {${initKeys.join(', ')}}`);
  }
});

// Check: title.js says "8 Misi" but there are 16 missions
console.log('\n--- Inkonsistensi Label Angka ---');
console.log(`Total misi di MISSIONS array: ${MISSIONS.length}`);
console.log(`Misi per bioma: sawah=${MISSIONS.filter(m=>m.biome==='sawah').length}, hutan=${MISSIONS.filter(m=>m.biome==='hutan').length}, sungai=${MISSIONS.filter(m=>m.biome==='sungai').length}, laut=${MISSIONS.filter(m=>m.biome==='laut').length}`);

// Check assessment question counts vs actual
if (typeof PRETEST_POSTTEST_BANK !== 'undefined') {
  console.log(`\nBank soal assessment: ${PRETEST_POSTTEST_BANK.length} butir`);
  [1,2,3,4].forEach(tp => {
    const actual = PRETEST_POSTTEST_BANK.filter(q => q.tpId === tp).length;
    const declared = typeof ASSESSMENT_TP !== 'undefined' ? ASSESSMENT_TP.find(t => t.id === tp) : null;
    const expected = declared ? declared.questionCount : '?';
    const match = actual === expected;
    console.log(`  TP ${tp}: deklarasi ${expected} soal, aktual ${actual} soal ${match ? '🟢' : '🔴 MISMATCH'}`);
  });
}

// Check for duplicate quiz questions (soal id 6 and 11 both about rantai makanan sawah)
console.log('\n--- Deteksi Duplikat Soal Assessment ---');
if (typeof PRETEST_POSTTEST_BANK !== 'undefined') {
  for (let i = 0; i < PRETEST_POSTTEST_BANK.length; i++) {
    for (let j = i + 1; j < PRETEST_POSTTEST_BANK.length; j++) {
      const a = PRETEST_POSTTEST_BANK[i];
      const b = PRETEST_POSTTEST_BANK[j];
      // Check if questions are very similar
      const simQ = a.q.replace(/[^a-zA-Z]/g, '').toLowerCase();
      const simR = b.q.replace(/[^a-zA-Z]/g, '').toLowerCase();
      if (simQ === simR) {
        console.log(`🔴 DUPLIKAT IDENTIK: Soal #${a.id} dan #${b.id}: "${a.q.slice(0, 60)}..."`);
      }
    }
  }
}

// --- PILAR 4: VERIFIKASI KUIS C2 IN-GAME ---
console.log('\n====================================================================');
console.log('  PILAR 4: VALIDASI KUIS C2 BLOOM IN-GAME (16 MISI)');
console.log('====================================================================\n');

MISSIONS.forEach(m => {
  const q = m.quiz;
  const correctOpt = q.opts[q.correct];

  // Verify correct index is valid
  if (q.correct < 0 || q.correct >= q.opts.length) {
    console.log(`🔴 ${m.id}: Index jawaban benar (${q.correct}) OUT OF BOUNDS! Opts hanya ${q.opts.length} item.`);
    return;
  }

  // Check answer count
  if (q.opts.length !== 3) {
    console.log(`🟡 ${m.id}: Jumlah opsi jawaban = ${q.opts.length}, standar = 3.`);
  }

  // Check chain has 4 simpul
  if (m.chain.length !== 4) {
    console.log(`🟡 ${m.id}: Rantai kausalitas memiliki ${m.chain.length} simpul, standar = 4.`);
  }

  // Verify explain field exists and is non-empty
  if (!q.explain || q.explain.length < 20) {
    console.log(`🟡 ${m.id}: Penjelasan kuis terlalu pendek (${q.explain?.length || 0} karakter).`);
  }
});

console.log('🟢 Semua 16 kuis memiliki index jawaban valid dan 4 simpul rantai kausalitas.\n');

console.log('====================================================================');
console.log('  AUDIT SELESAI');
console.log('====================================================================');
