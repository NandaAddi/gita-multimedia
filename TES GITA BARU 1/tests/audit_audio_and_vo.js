const fs = require('fs');
const path = require('path');

console.log('=== AUDIT PILAR 2: AUDIO & VOICE-OVER ===');

// 1. Get all VO files in voice-over folder
const voDir = 'voice-over';
const voFiles = fs.readdirSync(voDir).filter(f => f.endsWith('.mp3'));
console.log('Total MP3 files in voice-over folder:', voFiles.length);

// 2. Scan all JS files in js/
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.js')) {
      results.push(fullPath);
    }
  });
  return results;
}

const jsFiles = walk('js');
const voCallRegex = /playVO\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/g;
const voCalls = new Map();

jsFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = voCallRegex.exec(content)) !== null) {
    const key = match[1];
    if (!voCalls.has(key)) voCalls.set(key, []);
    voCalls.get(key).push(file);
  }
});

console.log('Total distinct static playVO() keys called in code:', voCalls.size);

// Dynamic VO calls (e.g., playVO(missionId), playVO(m.id + '_intro'), etc.)
// Let's check how missions/quizzes call playVO
jsFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('playVO(') && !line.match(/playVO\s*\(\s*['"`]/)) {
      console.log(`Dynamic playVO found in ${file}:${idx + 1}: ${line.trim()}`);
    }
  });
});

// Check if any static key is missing from files
let missingFiles = [];
for (let key of voCalls.keys()) {
  const expectedFile = key + '.mp3';
  if (!voFiles.includes(expectedFile)) {
    missingFiles.push({ key, files: voCalls.get(key) });
  }
}

console.log('Missing VO files for static calls:', missingFiles.length);
if (missingFiles.length > 0) {
  console.log('Missing list:', missingFiles);
}

// 3. Check audio.js implementation for error handling
const audioCode = fs.readFileSync('js/audio.js', 'utf8');
console.log('audio.js has catch on play():', audioCode.includes('.catch('));
console.log('audio.js has non-intrusive fallback:', audioCode.includes('catch') || audioCode.includes('onerror'));
