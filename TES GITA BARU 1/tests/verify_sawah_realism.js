// =====================================================================
// VERIFIKASI REALISME EKOSISTEM SAWAH TERASERING NUSANTARA
// =====================================================================
const fs = require('fs');
const vm = require('vm');
const path = require('path');

let pass = 0, fail = 0;
function ok(msg, cond) {
  if (cond) {
    console.log('  ✓ PASS: ' + msg);
    pass++;
  } else {
    console.error('  ✗ FAIL: ' + msg);
    fail++;
  }
}

console.log('=== VERIFIKASI REALISME VISUAL BIOMA SAWAH TERASERING ===\n');

// 1. Audit Statis Kode (Source Inspection)
console.log('1. Audit Statis Kode (backgrounds.js & characters.js):');
const bgCode = fs.readFileSync(path.join(__dirname, '../js/renderers/backgrounds.js'), 'utf8');
const charCode = fs.readFileSync(path.join(__dirname, '../js/renderers/characters.js'), 'utf8');
const simCode = fs.readFileSync(path.join(__dirname, '../js/scenes/simulation.js'), 'utf8');

ok('Fungsi getTerraceBundY terdefinisi di characters.js', charCode.includes('function getTerraceBundY('));
ok('Fungsi drawPolygonalMudCracks terdefinisi di characters.js', charCode.includes('function drawPolygonalMudCracks('));
ok('Fungsi drawIrrigationCanal terdefinisi di characters.js', charCode.includes('function drawIrrigationCanal('));
ok('Fungsi texSoilSawah terdefinisi di characters.js', charCode.includes('function texSoilSawah('));
ok('Tidak ada array fissureCenters ranting kaku di characters.js', !charCode.includes('fissureCenters = ['));
ok('spRice mendukung opsi malai bulir keemasan dan hopperburn', charCode.includes('isGolden') && charCode.includes('hopperburn'));
ok('spRice memiliki struktur 7 helai daun melengkung lentur', charCode.includes('Arching Flexible Blades') || charCode.includes('blades = ['));

ok('Fungsi drawSawahMountains terdefinisi di backgrounds.js', bgCode.includes('function drawSawahMountains('));
ok('Fungsi drawDragonfly terdefinisi di backgrounds.js', bgCode.includes('function drawDragonfly('));
ok('Fungsi drawSawahBirds terdefinisi di backgrounds.js', bgCode.includes('function drawSawahBirds('));
ok('sceneSawah menerapkan gelombang hembusan angin sawah menjalar', bgCode.includes('windWave1') || bgCode.includes('windWave'));
ok('sceneSawah menerapkan pola tanam jajar legowo (min 9 rumpun per baris)', bgCode.includes('Math.max(9'));

ok('simulation.js memicu _irrigationFlowTimer saat kartu air dimainkan', simCode.includes('_irrigationFlowTimer = 180'));

// 2. Lingkungan Eksekusi VM Sandbox
console.log('\n2. Evaluasi Fungsi Matematika Terasering:');
function mockCtx() {
  return new Proxy({}, {
    get(t, p) {
      if (p === 'createLinearGradient' || p === 'createRadialGradient')
        return () => ({ addColorStop() {} });
      if (typeof p === 'string') return () => {};
    },
    set() { return true; }
  });
}

const sandbox = {
  console,
  Math,
  Date,
  setInterval: () => {},
  clearInterval: () => {},
  setTimeout: () => {},
  clearTimeout: () => {},
  document: {
    querySelector: () => null,
    querySelectorAll: () => [],
    createElement: () => ({ width: 0, height: 0, getContext: () => mockCtx() })
  },
  ic: () => '',
  sfx: { click() {}, back() {}, chime() {}, pop() {}, deny() {}, success() {}, wrong() {}, grow() {}, water() {}, wave() {} },
  speak: () => {},
  toast: () => {}
};
vm.createContext(sandbox);

function runInVM(file) {
  const code = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  vm.runInContext(code, sandbox, { filename: file });
}
function grab(name) {
  return vm.runInContext(name, sandbox);
}

runInVM('js/config.js');
runInVM('js/audio.js');
runInVM('js/renderers/characters.js');
runInVM('js/renderers/backgrounds.js');

const getTerraceBundY = grab('getTerraceBundY');
const SCENE = grab('SCENE');

const yTier0 = getTerraceBundY(0, 960);
const yTier1 = getTerraceBundY(1, 960);
const yTier2 = getTerraceBundY(2, 960);
const yTier3 = getTerraceBundY(3, 960);

ok('Tier 0 berada di horizon atas (410-435px)', yTier0 >= 410 && yTier0 <= 435);
ok('Tier 1 berada di terasering atas (580-610px)', yTier1 >= 580 && yTier1 <= 610);
ok('Tier 2 berada di terasering tengah (760-800px)', yTier2 >= 760 && yTier2 <= 800);
ok('Tier 3 berada di terasering depan (950-1000px)', yTier3 >= 950 && yTier3 <= 1000);
ok('Terasering memiliki jenjang ketinggian proporsional', yTier1 > yTier0 && yTier2 > yTier1 && yTier3 > yTier2);

// 3. Simulasi Render 60 Frame Multi-Kondisi Ekologi
console.log('\n3. Simulasi Render 60 Frame Multi-Kondisi Ekologi:');
const c = mockCtx();

// Kondisi 1: Hari 1 Kemarau Panjang (Misi 1: water=14, prod=30)
console.log('  Testing Kondisi 1: Hari 1 Kemarau Panjang...');
const stateKemarau = { prod: 30, herb: 15, pred: 7, water: 14, wereng: 0 };
let renderOk1 = true;
try {
  for (let f = 0; f < 60; f++) {
    SCENE.sawah(c, f * 16.7, stateKemarau);
  }
} catch (e) {
  console.error('  Error render kemarau:', e);
  renderOk1 = false;
}
ok('Render 60 frame Hari 1 Kemarau berhasil lancar tanpa error', renderOk1);

// Kondisi 2: Penuh Air & Subur Keemasan (prod=65, water=80)
console.log('  Testing Kondisi 2: Penuh Air & Padi Keemasan...');
const stateSubur = { prod: 65, herb: 14, pred: 6, water: 80, wereng: 0 };
let renderOk2 = true;
try {
  for (let f = 0; f < 60; f++) {
    SCENE.sawah(c, f * 16.7, stateSubur);
  }
} catch (e) {
  console.error('  Error render subur:', e);
  renderOk2 = false;
}
ok('Render 60 frame Subur Keemasan berhasil lancar tanpa error', renderOk2);

// Kondisi 3: Krisis Wereng Batang Cokelat (Hopperburn, wereng=75)
console.log('  Testing Kondisi 3: Krisis Hama Wereng (Hopperburn)...');
const stateWereng = { prod: 35, wereng: 75, pred: 3, water: 60 };
let renderOk3 = true;
try {
  for (let f = 0; f < 60; f++) {
    SCENE.sawah(c, f * 16.7, stateWereng);
  }
} catch (e) {
  console.error('  Error render wereng:', e);
  renderOk3 = false;
}
ok('Render 60 frame Krisis Wereng (Hopperburn) berhasil lancar tanpa error', renderOk3);

// Kondisi 4: Aliran Irigasi Aktif Tulakan (_irrigationFlowTimer=180)
console.log('  Testing Kondisi 4: Aliran Irigasi Aktif Tulakan...');
const stateIrigasi = { prod: 35, water: 44, _irrigationFlowTimer: 180 };
let renderOk4 = true;
try {
  for (let f = 0; f < 60; f++) {
    SCENE.sawah(c, f * 16.7, stateIrigasi);
  }
} catch (e) {
  console.error('  Error render irigasi surge:', e);
  renderOk4 = false;
}
ok('Render 60 frame Aliran Irigasi Aktif Pintu Air berhasil lancar', renderOk4);
ok('_irrigationFlowTimer berkurang secara otomatis saat simulasi frame berjalan', stateIrigasi._irrigationFlowTimer < 180);

// Kondisi 5: Pencemaran Pestisida Kimiawi (poison=50)
console.log('  Testing Kondisi 5: Pencemaran Pestisida Kimiawi...');
const statePoison = { prod: 40, water: 50, poison: 50 };
let renderOk5 = true;
try {
  for (let f = 0; f < 60; f++) {
    SCENE.sawah(c, f * 16.7, statePoison);
  }
} catch (e) {
  console.error('  Error render poison:', e);
  renderOk5 = false;
}
ok('Render 60 frame Pencemaran Pestisida Kimiawi berhasil lancar', renderOk5);

console.log('\n======================================================');
console.log('HASIL AKHIR VERIFIKASI SAWAH TERASERING:');
console.log('Total PASS: ' + pass);
console.log('Total FAIL: ' + fail);
console.log('======================================================\n');

if (fail > 0) process.exit(1);
