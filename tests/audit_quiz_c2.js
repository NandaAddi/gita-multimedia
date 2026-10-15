const fs = require('fs');
const vm = require('vm');

console.log('=== AUDIT PILAR 4: VALIDITAS KUIS C2 BLOOM & DATA ===');

const s = { window: {}, document: { querySelector: () => null, querySelectorAll: () => [] } };
vm.createContext(s);
vm.runInContext(
  fs.readFileSync('js/config.js', 'utf8') + ';' +
  fs.readFileSync('js/data/ecosystems.js', 'utf8') + ';' +
  fs.readFileSync('js/data/missions.js', 'utf8') +
  '; this.MISSIONS = MISSIONS;',
  s
);

const missions = s.MISSIONS;
const quizReport = [];

missions.forEach((m, idx) => {
  const q = m.quiz;
  const issues = [];
  if (!q) issues.push('Quiz object missing');
  else {
    if (!q.q || typeof q.q !== 'string' || q.q.length < 15) issues.push('Question missing or too short');
    if (!Array.isArray(q.opts) || q.opts.length !== 3) issues.push('Options not exactly 3');
    if (typeof q.correct !== 'number' || q.correct < 0 || q.correct > 2) issues.push('Correct index invalid');
    if (!q.explain || typeof q.explain !== 'string' || q.explain.length < 20) issues.push('Explanation missing or too short');
  }

  // Check 4-node chain
  if (!Array.isArray(m.chain) || m.chain.length !== 4) {
    issues.push(`Causality chain is not 4 nodes (found: ${m.chain ? m.chain.length : 0})`);
  }

  quizReport.push({
    id: m.id,
    question: q ? q.q : 'N/A',
    correctAnswer: q ? q.opts[q.correct] : 'N/A',
    correctIndex: q ? q.correct : -1,
    explain: q ? q.explain : 'N/A',
    chain: m.chain,
    issues
  });
});

console.log('Quiz Issues Count:', quizReport.filter(r => r.issues.length > 0).length);
quizReport.forEach(r => {
  if (r.issues.length > 0) {
    console.log(`[ISSUE] ${r.id}:`, r.issues);
  } else {
    console.log(`[OK] ${r.id}: Kunci = [${r.correctIndex}] "${r.correctAnswer.substring(0, 35)}..."`);
  }
});
