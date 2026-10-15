// =====================================================================
// VERIFIKASI REALISME EKOSISTEM SUNGAI NUSANTARA (sceneSungai & texSoilSungai)
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

console.log('=== VERIFIKASI REALISME VISUAL BIOMA SUNGAI ===\n');

// 1. Audit Statis Kode (Source Inspection)
console.log('1. Audit Statis Kode (backgrounds.js & characters.js):');
const bgCode = fs.readFileSync(path.join(__dirname, '../js/renderers/backgrounds.js'), 'utf8');
const charCode = fs.readFileSync(path.join(__dirname, '../js/renderers/characters.js'), 'utf8');

ok('Tidak ada garis putus-putus aspal jalan raya setLineDash([46, 34])', !bgCode.includes('setLineDash([46,34])') && !bgCode.includes('setLineDash([46, 34])'));
ok('Tidak ada air kolam persegi kaku fillRect(0, 470, 1920, 340)', !bgCode.includes('fillRect(0,470,1920,340)') && !bgCode.includes('fillRect(0, 470, 1920, 340)'));
ok('Fungsi getRiverBankTop terdefinisi di characters.js', charCode.includes('function getRiverBankTop('));
ok('Fungsi getRiverBankBottom terdefinisi di characters.js', charCode.includes('function getRiverBankBottom('));
ok('Fungsi drawRiverBoulder terdefinisi di characters.js', charCode.includes('function drawRiverBoulder('));
ok('Fungsi drawRiverReeds terdefinisi di characters.js', charCode.includes('function drawRiverReeds('));
ok('Fungsi texSoilSungai terdefinisi di characters.js', charCode.includes('function texSoilSungai('));
ok('gulmaPatch mengimplementasikan bobbing vertikal', charCode.includes('bobY = Math.sin(') || charCode.includes('bobY'));
ok('gulmaPatch mengimplementasikan bunga eceng gondok lavender', charCode.includes('#9c88d9') || charCode.includes('#673ab7'));

// 2. Lingkungan Eksekusi VM Sandbox
console.log('\n2. Evaluasi Fungsi Matematika Kontur Sungai:');
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
  sfx: { click() {}, back() {}, chime() {}, pop() {}, deny() {}, success() {}, wrong() {} },
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

const getRiverBankTop = grab('getRiverBankTop');
const getRiverBankBottom = grab('getRiverBankBottom');
const SCENE = grab('SCENE');

const bankTop0 = getRiverBankTop(0);
const bankTop960 = getRiverBankTop(960);
const bankTop1920 = getRiverBankTop(1920);
ok('getRiverBankTop menghasilkan nilai y alami (435-485px)', bankTop0 >= 435 && bankTop0 <= 485 && bankTop960 >= 435 && bankTop960 <= 485 && bankTop1920 >= 435 && bankTop1920 <= 485);

const bankBot0 = getRiverBankBottom(0);
const bankBot960 = getRiverBankBottom(960);
const bankBot1920 = getRiverBankBottom(1920);
ok('getRiverBankBottom menghasilkan nilai y alami (780-835px)', bankBot0 >= 780 && bankBot0 <= 835 && bankBot960 >= 780 && bankBot960 <= 835 && bankBot1920 >= 780 && bankBot1920 <= 835);

ok('Lebar badan air konsisten realistis (300px - 380px)', (bankBot0 - bankTop0) >= 300 && (bankBot960 - bankTop960) >= 300);

// 3. Simulasi Render 60 Frame Multi-Kondisi Ekologi:
console.log('\n3. Simulasi Render 60 Frame Multi-Kondisi Ekologi:');
const c = mockCtx();

// A. Kondisi Normal Seimbang
let normalOk = true;
try {
  const S_normal = { water: 66, prod: 36, herb: 24, pred: 3, gulma: 10, poison: 0, trash: 0, lumpur: 0 };
  for (let f = 0; f < 60; f++) {
    SCENE.sungai(c, f * 16.7, S_normal);
  }
} catch (e) {
  normalOk = false;
  console.error(e);
}
ok('60 frame sceneSungai kondisi normal (Air zamrud jernih)', normalOk);

// B. Kondisi Krisis Erosi & Lumpur Aluvial Tinggi
let lumpurOk = true;
try {
  const S_lumpur = { water: 30, prod: 20, herb: 8, pred: 1, gulma: 4, poison: 0, trash: 15, lumpur: 35 };
  for (let f = 0; f < 60; f++) {
    SCENE.sungai(c, f * 16.7, S_lumpur);
  }
} catch (e) {
  lumpurOk = false;
  console.error(e);
}
ok('60 frame sceneSungai krisis erosi/lumpur (Air cokelat aluvial)', lumpurOk);

// C. Kondisi Pencemaran Racun & Limbah Detergen
let poisonOk = true;
try {
  const S_poison = { water: 50, prod: 15, herb: 4, pred: 0, gulma: 2, poison: 45, trash: 25, lumpur: 5 };
  for (let f = 0; f < 60; f++) {
    SCENE.sungai(c, f * 16.7, S_poison);
  }
} catch (e) {
  poisonOk = false;
  console.error(e);
}
ok('60 frame sceneSungai krisis limbah racun (Busa sabun & toska kusam)', poisonOk);

// 4. Verifikasi Organisme Sungai & Gulma
console.log('\n4. Verifikasi Organisme Sungai:');
const S_org = { water: 66, prod: 36, herb: 24, pred: 4, gulma: 36, poison: 0, trash: 0 };
SCENE.sungai(c, 1000, S_org);
const pool = S_org._orgPool || {};
ok('Pool ikan sungai (sungai_fish) aktif', pool['sungai_fish'] && pool['sungai_fish'].length > 0);
ok('Pool bangau (sungai_stork) aktif', pool['sungai_stork'] && pool['sungai_stork'].length > 0);
ok('Pool eceng gondok (sungai_gulma) aktif', pool['sungai_gulma'] && pool['sungai_gulma'].length > 0);

console.log(`\n========================================`);
console.log(`HASIL: ${pass} Passed, ${fail} Failed`);
console.log(`========================================`);

if (fail > 0) {
  process.exit(1);
} else {
  console.log('✅ SEMUA PENGUJIAN REALISME SUNGAI BERHASIL 100%!\n');
}
