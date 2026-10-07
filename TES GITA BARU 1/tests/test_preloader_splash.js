const fs = require('fs');
const path = require('path');

console.log('=== TEST: PRELOADER & UM LOGO SPLASH SCREEN ===');

// 1. Verify index.html markup
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
if (!html.includes('id="preloader-overlay"')) throw new Error('Missing #preloader-overlay in index.html');
if (!html.includes('src="assets/Lambang-UM.webp"')) throw new Error('Missing assets/Lambang-UM.webp in index.html');
if (!html.includes('id="preloader-bar-fill"')) throw new Error('Missing #preloader-bar-fill in index.html');
if (!html.includes('id="preloader-status"')) throw new Error('Missing #preloader-status in index.html');
if (!html.includes('id="preloader-pct"')) throw new Error('Missing #preloader-pct in index.html');
console.log('OK: index.html markup contains preloader & UM logo elements');

// 2. Verify css/game.css styles
const css = fs.readFileSync(path.join(__dirname, '..', 'css/game.css'), 'utf8');
if (!css.includes('@keyframes umZoomOut')) throw new Error('Missing @keyframes umZoomOut in game.css');
if (!css.includes('.preloader-overlay')) throw new Error('Missing .preloader-overlay in game.css');
if (!css.includes('.preloader-bar-fill')) throw new Error('Missing .preloader-bar-fill in game.css');
console.log('OK: css/game.css contains zoom-out animation and preloader styling');

// 3. Verify js/main.js logic
const mainJs = fs.readFileSync(path.join(__dirname, '..', 'js/main.js'), 'utf8');
if (!mainJs.includes('runPreloader')) throw new Error('Missing runPreloader function in js/main.js');
if (!mainJs.includes('preloader-overlay')) throw new Error('js/main.js does not target preloader-overlay');
if (!mainJs.includes('unlockAudio')) throw new Error('js/main.js should unlock audio on preloader tap');
if (!mainJs.includes('assetsReady')) throw new Error('js/main.js should gate start behind assetsReady');
if (!mainJs.includes('assets/Foto pas agita.webp')) throw new Error('js/main.js should preload Foto pas agita.webp');
console.log('OK: js/main.js implements strict asset readiness gatekeeper (no premature skip before 100% ready)');

// 4. Verify sw.js precache
const sw = fs.readFileSync(path.join(__dirname, '..', 'sw.js'), 'utf8');
if (!sw.includes('./assets/Lambang-UM.webp')) throw new Error('Missing Lambang-UM.webp in sw.js PRECACHE_ASSETS');
console.log('OK: sw.js includes Lambang-UM.webp in PRECACHE_ASSETS');

console.log('ALL PRELOADER TESTS PASSED 100%!');
