const fs = require('fs');
const vm = require('vm');
const s = { window: {}, document: { querySelector: () => null, querySelectorAll: () => [] } };
vm.createContext(s);
vm.runInContext(fs.readFileSync('js/config.js', 'utf8') + ';' + fs.readFileSync('js/data/ecosystems.js', 'utf8') + ';' + fs.readFileSync('js/data/missions.js', 'utf8') + '; this.MISSIONS = MISSIONS; this.cl = cl; this.c01 = c01;', s);

const m = s.MISSIONS.find(x => x.id === 'hutan-4');

function runPlaythrough(label, tickFn, healthFn, action3Fn) {
  console.log('\n--- ' + label + ' ---');
  let S = Object.assign({}, m.init);
  let won = false;
  for (let d = 1; d <= 25; d++) {
    tickFn(S);
    if (d === 2) m.actions[0].fx(S); // jerat
    if (d === 4) m.actions[1].fx(S); // harimau
    if (d === 7) (action3Fn || m.actions[2].fx)(S); // kamera
    if (d === 10) m.actions[1].fx(S); // harimau 2
    if (d === 13) m.actions[0].fx(S); // jerat 2
    S.health = healthFn(S);
    const tStatus = [S.trap <= 15, S.pred >= 4, S.health >= 75];
    console.log('Hari ' + (d < 10 ? '0' + d : d) + ': Prod=' + S.prod.toFixed(1) + ' Herb=' + S.herb.toFixed(1) + ' Pred=' + S.pred.toFixed(1) + ' Trap=' + S.trap.toFixed(1) + ' HP=' + S.health + '% | T1=' + tStatus[0] + ' T2=' + tStatus[1] + ' T3=' + tStatus[2]);
    if (tStatus.every(Boolean)) {
      console.log('>>> VICTORY ACHIEVED ON DAY ' + d + ' (HP ' + S.health + '%)! Target Tercapai! <<<');
      won = true;
      break;
    }
  }
  if (!won) console.log('>>> GAGAL / STUCK (HP Terakhir: ' + S.health + '%) <<<');
}

// 1. Current Active Mission Logic in missions.js
runPlaythrough('PENGUJIAN MISI HUTAN-4 (AKTIF)', m.tick, m.health, m.actions[2].fx);

