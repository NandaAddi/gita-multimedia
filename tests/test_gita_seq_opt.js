const fs = require('fs');
const path = require('path');

function checkFolder(fName) {
  const dir = path.join(__dirname, '..', fName);
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.webp'));
  console.log(fName, 'WebP frame count:', files.length);
  if (files.length !== 60) throw new Error('Expected 60 files in ' + fName);
  
  let totalBytes = 0;
  for (let i = 0; i < 60; i++) {
    const pad = String(i).padStart(5, '0');
    const expectedName = 'Comp 1_' + pad + '.webp';
    const p = path.join(dir, expectedName);
    if (!fs.existsSync(p)) throw new Error('Missing frame: ' + p);
    totalBytes += fs.statSync(p).size;
  }
  console.log(fName, 'all 60 frames present sequentially (00000..00059). Total size:', (totalBytes/1024).toFixed(1), 'KB');
}

checkFolder('assets/animations/talking_loop');
checkFolder('assets/animations/worried_loop');

// Verify gita-thinking folder (48 frames + poster.png)
const thinkDir = path.join(__dirname, '..', 'assets/animations/gita-thinking');
const thinkFrames = fs.readdirSync(thinkDir).filter(f => f.endsWith('.webp'));
console.log('assets/animations/gita-thinking WebP frame count:', thinkFrames.length);
if (thinkFrames.length !== 48) throw new Error('Expected 48 frames in gita-thinking');
for (let i = 0; i < 48; i++) {
  const pad = String(i).padStart(3, '0');
  const p = path.join(thinkDir, 'g' + pad + '.webp');
  if (!fs.existsSync(p)) throw new Error('Missing frame: ' + p);
}
if (!fs.existsSync(path.join(thinkDir, 'poster.png'))) {
  throw new Error('Missing poster.png in gita-thinking');
}
console.log('assets/animations/gita-thinking: all 48 frames (g000..g047) + poster.png verified!');

// Verify gita-sequence.js DEFAULTS
const gitaSeqCode = fs.readFileSync(path.join(__dirname, '..', 'js/renderers/gita-sequence.js'), 'utf8');
if (!gitaSeqCode.includes("folder: 'assets/animations/gita-thinking'")) {
  throw new Error('gita-sequence.js DEFAULTS.folder mismatch');
}

// Verify title.js play configuration
const titleCode = fs.readFileSync(path.join(__dirname, '..', 'js/scenes/title.js'), 'utf8');
if (!titleCode.includes("GitaSeq.play('#gita-title', { folder: 'assets/animations/gita-thinking', size: 400, fps: 12 })")) {
  throw new Error('title.js GitaSeq.play config mismatch');
}

const simCode = fs.readFileSync(path.join(__dirname, '..', 'js/scenes/simulation.js'), 'utf8');
if (!simCode.includes("folder: 'assets/animations/worried_loop', prefix: 'Comp 1_', pad: 5, ext: '.webp', frames: 60, fps: 12")) {
  throw new Error('simulation.js preload worried_loop mismatch');
}
if (!simCode.includes("folder: 'assets/animations/talking_loop', prefix: 'Comp 1_', pad: 5, ext: '.webp', frames: 60, fps: 12")) {
  throw new Error('simulation.js preload talking_loop mismatch');
}
if (!/ext:\s*'\.webp',\s*frames:\s*60,\s*fps:\s*12/.test(simCode)) {
  throw new Error('simulation.js renderBridgeStep play config mismatch');
}

console.log('ALL CHECKS PASSED: Gita Sequence WebP optimization verified 100%!');
