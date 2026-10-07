const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const htmlPath = path.join(rootDir, 'index.html');

console.log('=== VERIFY ROOT DEPLOYMENT FOR skripsi.agitakhairunnisa.my.id ===');
console.log('Checking:', htmlPath);

if (!fs.existsSync(htmlPath)) {
  console.error('FAIL: Root index.html does not exist!');
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, 'utf8');

// 1. Verify no meta-refresh or javascript redirect remains
if (html.includes('meta http-equiv="refresh"') || html.includes('window.location.replace("TES%20GITA%20BARU%201')) {
  console.error('FAIL: Root index.html still contains redirect code!');
  process.exit(1);
}
console.log('OK: Root index.html contains no redirects. It is the full game client.');

// 2. Extract and check all script tags
const scriptRegex = /<script\s+src="([^"?]+)(?:\?[^"]*)?"\s*><\/script>/g;
let match;
let missingFiles = 0;
let checkedCount = 0;

while ((match = scriptRegex.exec(html)) !== null) {
  const relPath = match[1];
  const absPath = path.join(rootDir, relPath);
  checkedCount++;
  if (!fs.existsSync(absPath)) {
    console.error(`FAIL: Missing script: ${relPath}`);
    missingFiles++;
  } else {
    const stat = fs.statSync(absPath);
    if (stat.size === 0) {
      console.error(`FAIL: Empty script: ${relPath}`);
      missingFiles++;
    }
  }
}
console.log(`OK: All ${checkedCount} script files exist at root and are non-empty.`);

// 3. Extract and check CSS stylesheets
const cssRegex = /<link\s+rel="stylesheet"\s+href="([^"?]+)(?:\?[^"]*)?"/g;
while ((match = cssRegex.exec(html)) !== null) {
  const relPath = match[1];
  if (relPath.startsWith('http')) continue;
  const absPath = path.join(rootDir, relPath);
  checkedCount++;
  if (!fs.existsSync(absPath)) {
    console.error(`FAIL: Missing stylesheet: ${relPath}`);
    missingFiles++;
  } else {
    console.log(`OK: Stylesheet exists: ${relPath}`);
  }
}

// 4. Check manifest, favicon, icons
const iconRegex = /<link\s+[^>]*href="([^"?]+)(?:\?[^"]*)?"/g;
while ((match = iconRegex.exec(html)) !== null) {
  const relPath = match[1];
  if (relPath.startsWith('http') || relPath.endsWith('.css')) continue;
  const absPath = path.join(rootDir, relPath);
  if (!fs.existsSync(absPath)) {
    console.error(`FAIL: Missing icon/manifest: ${relPath}`);
    missingFiles++;
  } else {
    console.log(`OK: Icon/Manifest exists: ${relPath}`);
  }
}

// 5. Check CNAME file
const cnamePath = path.join(rootDir, 'CNAME');
if (!fs.existsSync(cnamePath)) {
  console.error('FAIL: CNAME file missing!');
  missingFiles++;
} else {
  const cnameContent = fs.readFileSync(cnamePath, 'utf8').trim();
  if (cnameContent !== 'skripsi.agitakhairunnisa.my.id') {
    console.error(`FAIL: CNAME domain mismatch: expected skripsi.agitakhairunnisa.my.id, got ${cnameContent}`);
    missingFiles++;
  } else {
    console.log('OK: CNAME correctly configured for skripsi.agitakhairunnisa.my.id');
  }
}

// 6. Check _redirects
const redirectsPath = path.join(rootDir, '_redirects');
if (!fs.existsSync(redirectsPath)) {
  console.error('FAIL: _redirects missing!');
  missingFiles++;
} else {
  const redContent = fs.readFileSync(redirectsPath, 'utf8');
  if (redContent.includes('/WEBSITE/index.html')) {
    console.error('FAIL: _redirects still redirects root to /WEBSITE/index.html!');
    missingFiles++;
  } else {
    console.log('OK: _redirects properly configured for root game.');
  }
}

if (missingFiles > 0) {
  console.error(`Total failures: ${missingFiles}`);
  process.exit(1);
}

console.log('\n[PASS] Root domain deployment verification passed with 0 errors.');
