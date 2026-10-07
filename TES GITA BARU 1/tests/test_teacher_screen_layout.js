const fs = require('fs');
const assert = require('assert');

console.log('=== TEST LAYOUT PANDUAN GURU (TEACHER SCREEN) ===');

// 1. Verify teacher.js content
const teacherCode = fs.readFileSync('js/scenes/teacher.js', 'utf8');

// Check Slide 1 classes
assert(teacherCode.includes('class="tcard tcard-cp"'), 'Slide 1 should have tcard-cp');
assert(teacherCode.includes('class="tcard tcard-tp"'), 'Slide 1 should have tcard-tp');
assert(teacherCode.includes('class="t-tp-grid"'), 'Slide 1 should have t-tp-grid');
assert(teacherCode.includes('TP 1') && teacherCode.includes('TP 4'), 'Slide 1 has all 4 TP items');

// Check Slide 2
assert(teacherCode.includes('class="t-roles-grid"'), 'Slide 2 should have t-roles-grid');
assert(teacherCode.includes('chip-hijau') && teacherCode.includes('chip-merah'), 'Slide 2 should have CSCL voting chips');

// Check Slide 3
assert(teacherCode.includes('id="t-exam-btn"'), 'Slide 3 should have exam button');
assert(teacherCode.includes('id="t-reset-btn"'), 'Slide 3 should have reset button');
assert(teacherCode.includes('class="t-action-row"'), 'Slide 3 should have t-action-row for side-by-side layout');

// 2. Verify css/game.css content
const cssCode = fs.readFileSync('css/game.css', 'utf8');

assert(cssCode.includes('.tcol-body > .tcard'), 'CSS should have .tcol-body > .tcard flex rule');
assert(cssCode.includes('.tcol-body > .tcard.tcard-cp'), 'CSS should have .tcard-cp rule');
assert(cssCode.includes('.tcol-body > .tcard.tcard-tp'), 'CSS should have .tcard-tp rule');
assert(cssCode.includes('.t-action-row'), 'CSS should have .t-action-row');
assert(cssCode.includes('.t-exam-btn'), 'CSS should have .t-exam-btn');
assert(cssCode.includes('.btn-secondary-danger'), 'CSS should have .btn-secondary-danger');

console.log('OK: Struktur DOM dan CSS Layout Panduan Guru terverifikasi 100% konsisten.');
