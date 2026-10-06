const fs = require('fs');

const filesInFolder = new Set(
  fs.readdirSync('voice-over')
    .filter(f => f.endsWith('.mp3'))
    .map(f => f.replace('.mp3', ''))
);

const codeKeys = new Set([
  'vo_title_welcome',
  'vo_title_welcome_back',
  'vo_how_intro',
  'vo_team_intro',
  'vo_sim_target_ok',
  'vo_sim_all_targets',
  'vo_sim_vote_call',
  'vo_sim_vote_done',
  'vo_sim_fail_time',
  'vo_sim_fail_health',
  'vo_sim_danger',
  'vo_quiz_intro',
  'vo_quiz_correct',
  'vo_quiz_wrong',
  'vo_victory_cheer',
  'vo_victory_all'
]);

// Dynamic: vo_how_step1..4
for (let i = 1; i <= 4; i++) codeKeys.add('vo_how_step' + i);

// Dynamic: vo_team_sawah, hutan, sungai, laut
['sawah', 'hutan', 'sungai', 'laut'].forEach(t => codeKeys.add('vo_team_' + t));

// Dynamic: bridging 16 missions x 2 steps = 32
['sawah', 'hutan', 'sungai', 'laut'].forEach(b => {
  for (let m = 1; m <= 4; m++) {
    for (let s = 1; s <= 2; s++) {
      codeKeys.add('vo_bridge_' + b + m + '_s' + s);
    }
  }
});

// Dynamic: quiz 16 missions = 16
['sawah', 'hutan', 'sungai', 'laut'].forEach(b => {
  for (let m = 1; m <= 4; m++) {
    codeKeys.add('vo_quiz_' + b + m);
  }
});

console.log('Total Expected Keys in Code:', codeKeys.size);
console.log('Total Files in voice-over folder:', filesInFolder.size);

const missing = [];
for (const k of codeKeys) {
  if (!filesInFolder.has(k)) missing.push(k);
}

const extra = [];
for (const f of filesInFolder) {
  if (!codeKeys.has(f)) extra.push(f);
}

console.log('Missing Keys:', missing);
console.log('Extra Files:', extra);

if (missing.length === 0 && extra.length === 0) {
  console.log('>>> 100% PERFECT MATCH! SEMUA 72 BERKAS COCOK DENGAN KODE GAME! <<<');
}
