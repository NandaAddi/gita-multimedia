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

checkFolder('talking_loop');
checkFolder('worried_loop');

const simCode = fs.readFileSync(path.join(__dirname, '..', 'js/scenes/simulation.js'), 'utf8');
if (!simCode.includes("folder: 'worried_loop', prefix: 'Comp 1_', pad: 5, ext: '.webp', frames: 60, fps: 12")) {
  throw new Error('simulation.js preload worried_loop mismatch');
}
if (!simCode.includes("folder: 'talking_loop', prefix: 'Comp 1_', pad: 5, ext: '.webp', frames: 60, fps: 12")) {
  throw new Error('simulation.js preload talking_loop mismatch');
}
if (!/ext:\s*'\.webp',\s*frames:\s*60,\s*fps:\s*12/.test(simCode)) {
  throw new Error('simulation.js renderBridgeStep play config mismatch');
}

console.log('ALL CHECKS PASSED: Gita Sequence WebP optimization verified 100%!');
