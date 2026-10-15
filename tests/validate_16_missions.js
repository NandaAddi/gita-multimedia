/* ============================================================
   ECO-EXPLORER — tests/validate_16_missions.js
   Unit test validasi arsitektur 4 Kelompok & 16 Misi Kausalitas
   ============================================================ */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
let pass = 0, fail = 0;

function ok(name, cond, details = '') {
  if (cond) {
    pass++;
    console.log('  [PASS] ' + name);
  } else {
    fail++;
    console.log('  [FAIL] ' + name + (details ? ' -> ' + details : ''));
  }
}

// Sandbox mirip browser
const sandbox = {
  console,
  document: { querySelector: () => null, querySelectorAll: () => [] }
};
vm.createContext(sandbox);

function load(rel) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, rel), 'utf8'), sandbox, { filename: rel });
}

console.log('--- VALIDASI ARSITEKTUR 4 KELOMPOK & 16 MISI ---');

try {
  load('js/config.js');
  load('js/data/missions.js');
} catch (e) {
  console.error('Gagal memuat file:', e);
  process.exit(1);
}

const TEAMS = vm.runInContext('TEAMS', sandbox);
const MISSIONS = vm.runInContext('MISSIONS', sandbox);

// 1. Validasi 4 Kelompok
ok('Jumlah Kelompok tepat 4', Array.isArray(TEAMS) && TEAMS.length === 4, `Ditemukan: ${TEAMS ? TEAMS.length : 0}`);

const EXPECTED_TEAMS = ['sawah', 'hutan', 'sungai', 'laut'];
const actualTeamIds = TEAMS ? TEAMS.map(t => t.id) : [];
ok('ID 4 Kelompok sesuai spesifikasi (sawah, hutan, sungai, laut)',
  JSON.stringify(actualTeamIds) === JSON.stringify(EXPECTED_TEAMS),
  `Aktual: ${JSON.stringify(actualTeamIds)}`
);

if (Array.isArray(TEAMS)) {
  TEAMS.forEach(t => {
    const valid = t.id && t.name && t.mascot && t.motto && t.role && t.dossier;
    ok(`Kelompok [${t.id}] memiliki field lengkap`, !!valid);
  });
}

// 2. Validasi 16 Misi Total
ok('Jumlah Total Misi tepat 16', Array.isArray(MISSIONS) && MISSIONS.length === 16, `Ditemukan: ${MISSIONS ? MISSIONS.length : 0}`);

if (Array.isArray(MISSIONS)) {
  EXPECTED_TEAMS.forEach(biome => {
    const bMissions = MISSIONS.filter(m => m.biome === biome);
    ok(`Bioma [${biome}] memiliki tepat 4 misi`, bMissions.length === 4, `Ditemukan: ${bMissions.length}`);

    const alamMissions = bMissions.filter(m => m.type === 'alam');
    const manusiaMissions = bMissions.filter(m => m.type === 'manusia');

    ok(`Bioma [${biome}] memiliki 2 misi ulah alam`, alamMissions.length === 2, `Ditemukan: ${alamMissions.length}`);
    ok(`Bioma [${biome}] memiliki 2 misi ulah manusia`, manusiaMissions.length === 2, `Ditemukan: ${manusiaMissions.length}`);
  });

  // Validasi detail tiap misi
  MISSIONS.forEach((m, idx) => {
    const hasBase = m.id && m.biome && m.type && m.title && m.headline && m.task && m.story;
    ok(`Misi #${idx + 1} [${m.id}] kelengkapan metadata`, !!hasBase);

    ok(`Misi #${idx + 1} [${m.id}] memiliki 3 aksi`, Array.isArray(m.actions) && m.actions.length === 3, `Jumlah aksi: ${m.actions ? m.actions.length : 0}`);
    ok(`Misi #${idx + 1} [${m.id}] memiliki 4 statistik`, Array.isArray(m.stats) && m.stats.length === 4, `Jumlah stats: ${m.stats ? m.stats.length : 0}`);
    ok(`Misi #${idx + 1} [${m.id}] memiliki 3 target`, Array.isArray(m.targets) && m.targets.length === 3, `Jumlah targets: ${m.targets ? m.targets.length : 0}`);
    ok(`Misi #${idx + 1} [${m.id}] memiliki 4 rantai kausalitas`, Array.isArray(m.chain) && m.chain.length === 4, `Jumlah chain: ${m.chain ? m.chain.length : 0}`);

    const quizValid = m.quiz && m.quiz.q && Array.isArray(m.quiz.opts) && m.quiz.opts.length === 3 &&
      typeof m.quiz.correct === 'number' && m.quiz.correct >= 0 && m.quiz.correct <= 2 && m.quiz.explain;
    ok(`Misi #${idx + 1} [${m.id}] validitas kuis C2 Bloom`, !!quizValid);

    // Test eksekusi simulasi
    try {
      const state = Object.assign({}, m.init);
      if (typeof m.tick === 'function') m.tick(state);
      const h = typeof m.health === 'function' ? m.health(state) : null;
      ok(`Misi #${idx + 1} [${m.id}] eksekusi tick & health (output: ${h}%)`, typeof h === 'number' && !isNaN(h));
    } catch (err) {
      ok(`Misi #${idx + 1} [${m.id}] eksekusi tick & health`, false, err.message);
    }
  });
}

console.log(`\nRINGKASAN: ${pass} PASSED, ${fail} FAILED`);
if (fail > 0) {
  process.exit(1);
} else {
  console.log('SEMUA TEST LULUS DENGAN SEMPURNA!');
  process.exit(0);
}
