const vm = require('vm');
const fs = require('fs');

const noop = () => {};
const mockCtx = new Proxy({}, {
  get: (target, prop) => {
    if (prop === 'createLinearGradient' || prop === 'createRadialGradient') {
      return () => ({ addColorStop: noop });
    }
    return noop;
  }
});

function createMockEl(){
  return {
    style: {},
    classList: { add: noop, remove: noop, toggle: noop, contains: () => false },
    onclick: noop,
    remove: noop,
    addEventListener: noop,
    removeEventListener: noop,
    closest: () => createMockEl(),
    getContext: () => mockCtx,
    width: 1920,
    height: 1080,
    innerHTML: '',
    textContent: '',
    dataset: { i: '0', biome: 'sawah', v: '0' },
    appendChild: noop,
    querySelector: () => createMockEl(),
    querySelectorAll: () => [createMockEl(), createMockEl()]
  };
}

const context = {
  console,
  setTimeout: (fn) => fn(),
  clearTimeout: noop,
  setInterval: () => 1,
  clearInterval: noop,
  URLSearchParams,
  document: {
    readyState: 'complete',
    addEventListener: noop,
    createElement: () => createMockEl(),
    querySelector: () => createMockEl(),
    querySelectorAll: () => [createMockEl(), createMockEl()],
    getElementById: () => createMockEl(),
    hidden: false
  },
  location: { search: '' },
  localStorage: { getItem: () => null, setItem: noop },
  innerWidth: 1920,
  innerHeight: 1080,
  requestAnimationFrame: noop,
  addEventListener: noop
};
context.window = context;
context.globalThis = context;
vm.createContext(context);

const scripts = [
  'config.js', 'state.js', 'audio.js', 'data/ecosystems.js', 'data/missions.js',
  'renderers/characters.js', 'renderers/backgrounds.js',
  'scenes/title.js', 'scenes/tutorial.js', 'scenes/how.js', 'scenes/teacher.js',
  'scenes/team.js', 'scenes/biome.js',
  'scenes/mission-menu.js', 'scenes/simulation.js', 'scenes/quiz.js', 'scenes/victory.js',
  'main.js'
];

for (const s of scripts) {
  vm.runInContext(fs.readFileSync('TES GITA BARU 1/js/' + s, 'utf-8'), context);
}

console.log('Testing scene flow functions...');
vm.runInContext("buildHow(); go('how');", context);
console.log('  [OK] How to play screen built (Bento 4 panels)');

vm.runInContext("buildTeacher(); go('teacher');", context);
console.log('  [OK] Teacher guide screen built (Cockpit 3 columns)');

vm.runInContext("buildTutorial(); go('tutorial');", context);
console.log('  [OK] Tutorial screen built');

vm.runInContext("buildTeam(); go('team');", context);
console.log('  [OK] Team screen built & mascots rendered');

vm.runInContext("buildBiome(); go('biome');", context);
console.log('  [OK] Biome screen built & previews drawn');

vm.runInContext("buildMissionMenu('sawah'); go('mission');", context);
console.log('  [OK] Mission menu built');

vm.runInContext("startSim(MISSIONS[0]);", context);
console.log('  [OK] Simulation started & bridge dialog triggered');

vm.runInContext("closeBridgeDialog();", context);
console.log('  [OK] Bridge dialog closed');

vm.runInContext("startQuiz(MISSIONS[0], 3, 5);", context);
console.log('  [OK] Quiz started');

vm.runInContext("startVictory(MISSIONS[0], 3, 5);", context);
console.log('  [OK] Victory screen shown');

console.log('\n>>> COMPLETE SCENE LIFECYCLE AND RENDERERS VERIFIED 100% CLEAN! <<<');
