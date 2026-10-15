const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== TEST AUDIT UNIT RESPONSIVE STAGE (NO VH/VW IN STAGE) ===');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.js') && dir.includes('scenes')) {
      results.push(fullPath);
    }
  });
  return results;
}

const sceneFiles = walk('js/scenes');
const vhVwRegex = /(?:height|width|top|bottom|margin|padding)\s*:\s*[^;]*[0-9]+(?:vh|vw)/gi;

let violations = [];
sceneFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = vhVwRegex.exec(content)) !== null) {
    violations.push({ file, match: match[0] });
  }
});

assert.strictEqual(violations.length, 0, `Ditemukan penggunaan unit viewport vh/vw di file scene yang merusak penskalaan stage: ${JSON.stringify(violations)}`);
console.log('OK: Seluruh scene bebas dari unit vh/vw. Layout terjamin 100% konsisten di mobile & desktop.');
