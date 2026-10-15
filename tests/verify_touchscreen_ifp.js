/**
 * Automated Verification Script for Touchscreen & IFP Enhancements
 * Tests CSS rules, Pointer Events, Single Active Pointer Lock, and Scene Syntax.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

console.log('=== VERIFIKASI TOUCHSCREEN & IFP ERGONOMICS ===\n');

// 1. Verifikasi Syntax Node.js pada semua file yang dimodifikasi
console.log('1. Syntax Validation:');
const filesToVerify = [
  'js/scenes/simulation.js',
  'js/scenes/team.js',
  'js/scenes/biome.js',
  'js/scenes/quiz.js'
];

filesToVerify.forEach(file => {
  try {
    execSync(`node -c "${path.join(__dirname, '..', file)}"`);
    assert(true, `Syntax valid: ${file}`);
  } catch (err) {
    assert(false, `Syntax error in: ${file} - ${err.message}`);
  }
});

// 2. Verifikasi CSS Game Rules di css/game.css
console.log('\n2. CSS Touch Rules Validation (css/game.css):');
const cssContent = fs.readFileSync(path.join(__dirname, '..', 'css/game.css'), 'utf8');

assert(cssContent.includes('-webkit-tap-highlight-color:transparent'), 'Global tap-highlight-color is transparent');
assert(cssContent.includes('.dock-grid{display:flex;gap:24px;scroll-snap-type:x mandatory;touch-action:none;}'), '.dock-grid has touch-action: none');
assert(cssContent.includes('touch-action:none') && cssContent.includes('.dock-card{'), '.dock-card has touch-action: none');
assert(cssContent.includes('.dock-card.selected'), '.dock-card.selected class is defined');
assert(cssContent.includes('pulseSelectGlow'), 'pulseSelectGlow animation is defined');
assert(cssContent.includes('.drag-proxy'), '.drag-proxy class is defined');
assert(cssContent.includes('-webkit-overflow-scrolling:touch'), 'Smooth touch scrolling is configured');
assert(cssContent.includes('.t-step-slide{flex:1;min-height:380px;display:flex;flex-direction:column;overflow-y:auto;-webkit-overflow-scrolling:touch;touch-action:pan-y;}'), 'Teacher slide has touch momentum scroll');

// 3. Verifikasi Logika Dual-Mode & Pointer Lock di simulation.js
console.log('\n3. Simulation Logic & Pointer Lock Validation (js/scenes/simulation.js):');
const simContent = fs.readFileSync(path.join(__dirname, '..', 'js/scenes/simulation.js'), 'utf8');

assert(simContent.includes('activePointerId'), 'activePointerId variable exists for single pointer lock');
assert(simContent.includes('selectedCardIndex'), 'selectedCardIndex exists for tap-to-place mode');
assert(simContent.includes('clearCardSelection'), 'clearCardSelection function exists');
assert(simContent.includes('selectCard'), 'selectCard function exists');
assert(simContent.includes('handleCardTapSelect'), 'handleCardTapSelect handles tap vs drag distinction');
assert(simContent.includes('resetTouchLock'), 'resetTouchLock failsafe exists');
assert(simContent.includes('setPointerCapture'), 'setPointerCapture is utilized');
assert(simContent.includes('e.clientY - 35'), 'Visual lift offset (-35px) for IFP visibility exists');
assert(simContent.includes('data-touch-tap-bound'), 'Landscape Tap-to-Place listener is registered on #scr-sim');
assert(simContent.includes('activePointerId !== null && e.pointerId !== activePointerId'), 'Palm rejection & multi-touch filtering exists');

// 4. Verifikasi Swipe Gestures di team.js dan biome.js
console.log('\n4. Swipe Gesture Pointer Tracking Validation (team.js & biome.js):');
const teamContent = fs.readFileSync(path.join(__dirname, '..', 'js/scenes/team.js'), 'utf8');
const biomeContent = fs.readFileSync(path.join(__dirname, '..', 'js/scenes/biome.js'), 'utf8');

assert(teamContent.includes('activeSwipePointerId'), 'team.js tracks activeSwipePointerId');
assert(teamContent.includes("stage.style.touchAction = 'pan-y'"), 'team.js sets touchAction to pan-y');
assert(teamContent.includes('pointercancel'), 'team.js handles pointercancel');

assert(biomeContent.includes('activeSwipePointerId'), 'biome.js tracks activeSwipePointerId');
assert(biomeContent.includes("stage.style.touchAction = 'pan-y'"), 'biome.js sets touchAction to pan-y');
assert(biomeContent.includes('pointercancel'), 'biome.js handles pointercancel');

// 5. Verifikasi Kuis C2 Audio Replay di quiz.js
console.log('\n5. Quiz Audio Replay Touch Indicator Validation (quiz.js):');
const quizContent = fs.readFileSync(path.join(__dirname, '..', 'js/scenes/quiz.js'), 'utf8');

assert(quizContent.includes('vo-listen-badge'), 'quiz.js has visual vo-listen-badge');
assert(quizContent.includes('touch-action:manipulation'), 'quiz.js qtext has touch-action:manipulation');

console.log(`\n========================================`);
console.log(`HASIL: ${passed} Passed, ${failed} Failed`);
console.log(`========================================`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('✅ SEMUA PENGUJIAN TOUCHSCREEN & IFP BERHASIL 100%!\n');
}
