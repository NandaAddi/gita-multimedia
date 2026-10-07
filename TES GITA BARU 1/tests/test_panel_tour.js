/* ============================================================
   ECO-EXPLORER — tests/test_panel_tour.js
   Verifikasi Onboarding Spotlight Panel Tour & Default Expanded HUD
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

// Mock DOM elements
function createMockElement(tag, className = '') {
  const el = {
    tagName: tag.toUpperCase(),
    className,
    style: {},
    innerHTML: '',
    textContent: '',
    children: [],
    attributes: {},
    dataset: {},
    hasAttribute(a) { return a in this.attributes; },
    setAttribute(a, v) { this.attributes[a] = v; },
    getAttribute(a) { return this.attributes[a] || null; },
    classList: {
      _classes: new Set(className ? className.split(' ') : []),
      add(c) { this._classes.add(c); el.className = Array.from(this._classes).join(' '); },
      remove(c) { this._classes.delete(c); el.className = Array.from(this._classes).join(' '); },
      toggle(c, force) {
        if (force === undefined) {
          if (this._classes.has(c)) this._classes.delete(c);
          else this._classes.add(c);
        } else if (force) {
          this._classes.add(c);
        } else {
          this._classes.delete(c);
        }
        el.className = Array.from(this._classes).join(' ');
      },
      contains(c) { return this._classes.has(c); }
    },
    appendChild(child) {
      this.children.push(child);
      child.parentNode = this;
      return child;
    },
    remove() {
      if (this.parentNode) {
        const idx = this.parentNode.children.indexOf(this);
        if (idx !== -1) this.parentNode.children.splice(idx, 1);
        this.parentNode = null;
      }
    },
    querySelector(sel) {
      if (sel === '#tour-skip-btn') return this.children.find(c => c.id === 'tour-skip-btn') || createMockElement('button');
      if (sel === '#tour-next-btn') return this.children.find(c => c.id === 'tour-next-btn') || createMockElement('button');
      return createMockElement('div');
    },
    querySelectorAll(sel) {
      return [];
    },
    addEventListener() {},
    removeEventListener() {}
  };
  return el;
}

const mockDoc = {
  body: createMockElement('body'),
  elements: {},
  createElement(tag) {
    return createMockElement(tag);
  },
  querySelector(sel) {
    if (this.elements[sel]) return this.elements[sel];
    const created = createMockElement('div');
    this.elements[sel] = created;
    return created;
  },
  querySelectorAll(sel) {
    return [];
  }
};

const sandbox = {
  console,
  setInterval: () => 123,
  clearInterval: () => {},
  setTimeout: (fn) => fn(),
  clearTimeout: () => {},
  document: mockDoc,
  window: { innerWidth: 1920, innerHeight: 1080 },
  location: { search: '' },
  URLSearchParams: global.URLSearchParams,
  localStorage: {
    data: {},
    getItem(k) { return this.data[k] || null; },
    setItem(k, v) { this.data[k] = v; }
  },
  ic: () => '',
  gitaSVG: () => '<svg></svg>',
  el: (sel) => mockDoc.querySelector(sel),
  els: () => [],
  modal: () => createMockElement('div'),
  closeModal: () => {},
  toast: () => {},
  sfx: { click() {}, back() {}, chime() {}, pop() {}, deny() {}, success() {}, wrong() {} },
  toggleSound: () => {},
  syncSound: () => {},
  simExpr: () => {},
  MASC: {},
  playVO: () => {},
  stopVO: () => {},
  go: () => {},
  totStars: () => 0
};

vm.createContext(sandbox);

function load(rel) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, rel), 'utf8'), sandbox, { filename: rel });
}
function grab(name) {
  return vm.runInContext(name, sandbox);
}

console.log('=== TEST SUITE: ONBOARDING SPOTLIGHT PANEL TOUR ===');

load('js/config.js');
load('js/state.js');
load('js/data/ecosystems.js');
load('js/data/missions.js');
load('js/scenes/team.js');
load('js/scenes/simulation.js');

const G = grab('G');
const startSim = grab('startSim');
const startPanelTour = grab('startPanelTour');
const cleanupPanelTour = grab('cleanupPanelTour');
const MISSIONS = grab('MISSIONS');

ok('G.toursSeen terdefinisi sebagai objek', typeof G.toursSeen === 'object');
ok('startPanelTour adalah fungsi', typeof startPanelTour === 'function');
ok('cleanupPanelTour adalah fungsi', typeof cleanupPanelTour === 'function');

// 1. Uji Default Expanded HUD pada startSim
const mission = MISSIONS[0]; // Sawah 1
startSim(mission);
const SIM = grab('SIM');

ok('SIM.ui.left default bernilai TRUE (Target Misi & Gita langsung terbuka)', SIM.ui.left === true);
ok('SIM.ui.right default bernilai TRUE (Kondisi Ekosistem langsung terbuka)', SIM.ui.right === true);
ok('SIM.ui.top default bernilai TRUE (Top Bar & HPOD terbuka)', SIM.ui.top === true);

// 2. Uji Eksekusi startPanelTour
let completed = false;
startPanelTour(() => {
  completed = true;
});

ok('Tur panel aktif, SIM.paused bernilai TRUE selama tur', SIM.paused === true);
ok('Overlay spotlight terpasang di container', grab('tourOverlayEl') !== null);

// 3. Uji Akhir Tur (endTour / cleanup)
cleanupPanelTour();
ok('cleanupPanelTour membersihkan overlay', grab('tourOverlayEl') === null);
ok('cleanupPanelTour membersihkan kartu panduan', grab('tourCardEl') === null);

// 4. Verifikasi Registrasi Rekam Tur Bioma
G.toursSeen['tour_' + mission.biome] = true;
grab('saveG')();
ok('G.toursSeen tersimpan ke localStorage', sandbox.localStorage.getItem('eco.save').includes('tour_sawah'));

console.log(`\nHasil: ${pass} lolos, ${fail} gagal\n`);
if (fail > 0) process.exit(1);
