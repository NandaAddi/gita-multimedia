const fs = require('fs');
const path = require('path');

console.log('=== AUDIT PILAR 3: ERGONOMI LAYAR SENTUH IFP & UI ===');

// Check CSS and JS for font sizes < 24px
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk('js').concat(['css/style.css', 'index.html'].filter(f => fs.existsSync(f)));

const fontRegex = /(?:font-size|fontSize)\s*[:=]\s*['"]?([0-9]+)px/g;
const smallFonts = [];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = fontRegex.exec(content)) !== null) {
    const size = parseInt(match[1], 10);
    if (size < 24) {
      // Find line number
      const lineNum = content.substring(0, match.index).split('\n').length;
      smallFonts.push({ file, line: lineNum, size, match: match[0] });
    }
  }
});

console.log(`Ditemukan ${smallFonts.length} font berukuran < 24px di file CSS/JS UI.`);
// Group by size and file
const fileSummary = {};
smallFonts.forEach(f => {
  fileSummary[f.file] = (fileSummary[f.file] || 0) + 1;
});
console.log('File breakdown:', fileSummary);

console.log('Daftar lengkap font kecil:');
smallFonts.forEach(f => console.log(`  ${f.file}:${f.line} -> ${f.match}`));


// Check touch targets and debounce
const debounceCheck = [];
files.filter(f => f.endsWith('.js')).forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('addEventListener') && content.includes('click')) {
    const hasDebounce = content.includes('debounce') || content.includes('lastClick') || content.includes('busy');
    debounceCheck.push({ file, hasDebounce });
  }
});
console.log('Pemeriksaan proteksi multi-click/debounce:', debounceCheck);
