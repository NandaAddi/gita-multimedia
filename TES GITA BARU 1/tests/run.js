/* ============================================================
   ECO-EXPLORER — tests/run.js
   Regression harness permanen (Pass 4 anti-slop).
   Menjalankan file game ASLI dalam urutan load browser memakai
   mock canvas/DOM — TANPA mengubah perilaku game.
   Cara pakai:  node tests/run.js   (exit 0 = lolos semua)
   ============================================================ */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
let pass = 0, fail = 0;
function ok(name, cond) {
  if (cond) { pass++; console.log('  OK  ' + name); }
  else { fail++; console.log('  FAIL ' + name); }
}

// ---- mock canvas 2D context (semua method = no-op) ----
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
function mockEl() {
  return {
    classList: { toggle() {}, contains() { return false; } },
    querySelector() { return mockEl(); }
  };
}

// ---- sandbox mirip browser ----
const sandbox = {
  console,
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
function load(rel) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, rel), 'utf8'), sandbox, { filename: rel });
}
function grab(name) { return vm.runInContext(name, sandbox); }

console.log('[1] config.js');
load('js/config.js');
const PAL = grab('PAL'), pr = grab('pr');
ok('PAL 18 kunci', Object.keys(PAL).length === 18);
ok('helper pr deterministik', pr(5) === pr(5));

console.log('[1b] audio.js (sfx presets)');
load('js/audio.js');
const sfxObj = grab('sfx');
ok('sfx.grow terdefinisi', typeof sfxObj.grow === 'function');
ok('sfx.flee terdefinisi', typeof sfxObj.flee === 'function');
ok('sfx.wither terdefinisi', typeof sfxObj.wither === 'function');


console.log('[2] renderers/characters.js');
load('js/renderers/characters.js');
const c = mockCtx();
for (let f = 0; f < 8; f++) sandbox.spFrog(c, 220 + f * 150, 880, f * 613);
ok('spFrog 8 fase', true);
sandbox.mFrog(c);
ok('mFrog', true);
for (let f = 0; f < 7; f++) {
  sandbox.spRice(c, 300 + f * 100, 800, 40, '#3f9a4e', Math.sin(f) * 2);
  sandbox.spGrass(c, 200 + f * 50, 900, .5 + f * .1, 7 + f, f * 613);
}
ok('spRice+spGrass 7 fase', true);
[
  [[[0,360],[300,240],[640,360]],'#96b98d',11],
  [[[420,360],[820,200],[1240,360]],'#7fae7c',23],
  [[[200,360],[560,280],[980,360],[1500,300],[1920,360]],'#6a9e6e',37],
  [[[0,380],[340,250],[720,380]],'#8fb996',51],
  [[[520,380],[960,210],[1400,380]],'#79a87f',63],
  [[[0,380],[500,300],[1000,380],[1500,310],[1920,380]],'#5e8f63',77],
  [[[0,340],[500,240],[1100,340],[1700,260],[1920,340]],'#6f9e68',91]
].forEach(a => sandbox.texRidge(c, a[0], a[1], a[2]));
ok('texRidge 7 pemanggil', true);

console.log('[3] renderers/backgrounds.js');
load('js/renderers/backgrounds.js');
const CONF_COLS = grab('CONF_COLS'), SCENE = grab('SCENE');
ok('CONF_COLS PAL resolve',
  JSON.stringify(CONF_COLS) === JSON.stringify(['#f5a30b','#38bdf8','#2ec98b','#ff5c4d','#fef08a','#c95f8a']));
const n1 = sandbox.sunNoise(), n2 = sandbox.sunNoise();
ok('sunNoise di-cache', n1 === n2);
for (let f = 0; f < 60; f++) sandbox.sunDraw(c, 1620, 120, f * 16.7);
ok('sunDraw 60 frame', true);
// konvergensi transisi air
const S = { water: 20, prod: 50, herb: 14, pred: 6, poison: 0 };
for (let f = 0; f < 20; f++) sandbox.wdisp(S);
S.water = 50;
let v = 0;
for (let f = 0; f < 60; f++) v = sandbox.wdisp(S);
ok('wdisp mendarat <1 dalam 60 frame', Math.abs(50 - v) < 1);
const S2 = { water: 40, prod: 50, herb: 14, pred: 6, poison: 0, gulma: 10, trash: 0 };
const L = { heat: 60, prod: 40, herb: 20, pred: 3, trash: 0, bomb: 0 };
for (let f = 0; f < 10; f++) {
  SCENE.sawah(c, f * 16.7, S2);
  SCENE.sungai(c, f * 16.7, S2);
  SCENE.laut(c, f * 16.7, L);
}
ok('3 scene air 10 frame', true);

console.log('[3b] OrganismPool lifecycle tracker');
const testS = { prod: 50, herb: 10, pred: 4, poison: 0, water: 60 };
sandbox.initOrganismPool(testS);
ok('initOrganismPool membuat pool', testS._orgPool && typeof testS._orgPool === 'object');
sandbox.syncOrganismPool(testS, 'rice', 3, (i) => ({ x: 100 * i, y: 500 }), { isPlant: true, durationIn: 1000 });
const rices = testS._orgPool['rice'] || [];
ok('syncOrganismPool menambah 3 entitas', rices.length === 3);
ok('status entitas baru = spawning', rices[0] && rices[0].state === 'spawning');
sandbox.updateOrganismPool(testS, 1000);
ok('status entitas setelah selesai spawn = alive', rices[0] && rices[0].state === 'alive');
testS.poison = 20;
sandbox.syncOrganismPool(testS, 'rice', 1, (i) => ({ x: 100 * i, y: 500 }), { isPlant: true, durationOut: 1000 });
const ricesAfterDrop = testS._orgPool['rice'] || [];
const witheringRices = ricesAfterDrop.filter(r => r.state === 'withering');
ok('saat target turun, entitas masuk withering', witheringRices.length === 2);
sandbox.updateOrganismPool(testS, 1000);
const ricesCleaned = testS._orgPool['rice'] || [];
ok('setelah wither selesai, entitas mati dibersihkan', ricesCleaned.length === 1);


console.log('[4] scenes/simulation.js (toggle minimize)');
sandbox.document.querySelector = () => mockEl();
load('js/state.js');
load('js/scenes/simulation.js');
const setSIM = v => vm.runInContext('SIM = __v', Object.assign(sandbox, { __v: v }));
const getSIM = () => grab('SIM');
setSIM({ ui: { left: true, right: true, top: true, leftDot: false } });
sandbox.toggleUIPanel('top');
ok('top hide', getSIM().ui.top === false);
sandbox.toggleUIPanel('top');
ok('top restore', getSIM().ui.top === true);
sandbox.toggleUIPanel('left');
ok('left tetap jalan', getSIM().ui.left === false);

console.log('[5] scenes/mission-menu.js (openMission & startMission)');
let modalBtnClick = null;
sandbox.modal = () => ({
  querySelector: () => ({
    set onclick(fn) { modalBtnClick = fn; },
    get onclick() { return modalBtnClick; }
  })
});
load('js/data/ecosystems.js');
load('js/data/missions.js');
load('js/scenes/mission-menu.js');
ok('openMission terdefinisi', typeof sandbox.openMission === 'function');
ok('startMission terdefinisi', typeof sandbox.startMission === 'function');
let simStartedWith = null;
sandbox.startSim = (m) => { simStartedWith = m; };
sandbox.startMission('sawah-1');
if (modalBtnClick) modalBtnClick();
ok('startMission membuka modal dan startSim saat diklik', simStartedWith && simStartedWith.id === 'sawah-1');


console.log('[6] Stress test 300 frame (4 bioma & memory leak validation)');
const stressSawah = { prod: 50, water: 60, herb: 12, pred: 4, poison: 0 };
const stressHutan = { prod: 50, water: 60, herb: 14, pred: 3, trap: 0 };
const stressSungai = { prod: 40, water: 70, herb: 20, pred: 3, gulma: 10, poison: 0, trash: 0 };
const stressLaut = { prod: 40, heat: 25, herb: 18, pred: 3, trash: 0, bomb: 0 };

for (let f = 0; f < 300; f++) {
  const t = f * 16.7;
  if (f === 60) { stressSawah.prod = 20; stressSawah.poison = 30; }
  if (f === 150) { stressSawah.prod = 60; stressSawah.poison = 0; }
  if (f === 200) { stressSawah.herb = 24; }
  if (f === 250) { stressSawah.herb = 6; }

  SCENE.sawah(c, t, stressSawah);
  SCENE.hutan(c, t, stressHutan);
  SCENE.sungai(c, t, stressSungai);
  SCENE.laut(c, t, stressLaut);
}
ok('300 frame simulasi dinamis 4 bioma lancar', true);

let totalOrganismsSawah = 0;
let hasDeadLeak = false;
for (const k in stressSawah._orgPool) {
  totalOrganismsSawah += stressSawah._orgPool[k].length;
  if (stressSawah._orgPool[k].some(e => e.state === 'dead')) hasDeadLeak = true;
}
ok('tidak ada memory leak dead entity di sawah pool', !hasDeadLeak);
ok('total entitas sawah terkendali pasca-stress test (<= 60)', totalOrganismsSawah <= 60);

console.log(`\nHasil: ${pass} lolos, ${fail} gagal`);
process.exitCode = fail ? 1 : 0;



