const fs = require('fs');
const vm = require('vm');
const s = { window: {}, document: { querySelector: () => null, querySelectorAll: () => [] } };
vm.createContext(s);
vm.runInContext(
  fs.readFileSync('js/config.js', 'utf8') + ';' +
  fs.readFileSync('js/data/ecosystems.js', 'utf8') + ';' +
  fs.readFileSync('js/data/missions.js', 'utf8') +
  '; this.MISSIONS = MISSIONS; this.cl = cl; this.c01 = c01;',
  s
);

console.log('--- DETAIL INVESTIGASI SAWAH-4 ---');
const s4 = s.MISSIONS.find(x => x.id === 'sawah-4');
let S = Object.assign({}, s4.init);
console.log('Init:', S, 'Init HP:', s4.health(S));
for (let d = 1; d <= 15; d++) {
  s4.tick(S);
  if (d === 1) s4.actions[0].fx(S); // sita jerat
  if (d === 2) s4.actions[1].fx(S); // lepas ular
  if (d === 3) s4.actions[2].fx(S); // pasang burung hantu
  if (d === 4) s4.actions[1].fx(S); // lepas ular 2
  if (d === 5) s4.actions[0].fx(S); // sita jerat 2
  S.health = s4.health(S);
  const targets = s4.targets.map(t => t.c(S));
  console.log(`Hari ${d}: prod=${S.prod.toFixed(1)}, herb=${S.herb.toFixed(1)}, pred=${S.pred.toFixed(1)}, trap=${S.trap.toFixed(1)}, HP=${S.health}%, T1=${targets[0]}, T2=${targets[1]}, T3=${targets[2]}`);
}

console.log('\n--- DETAIL INVESTIGASI HUTAN-2 ---');
const h2 = s.MISSIONS.find(x => x.id === 'hutan-2');
let H = Object.assign({}, h2.init);
console.log('Init:', H, 'Init HP:', h2.health(H));
for (let d = 1; d <= 15; d++) {
  h2.tick(H);
  if (d === 1) h2.actions[0].fx(H); // padam api
  if (d === 2) h2.actions[1].fx(H); // sekat bakar
  if (d === 3) h2.actions[0].fx(H); // padam api 2
  if (d === 4) h2.actions[1].fx(H); // sekat bakar 2
  if (d === 5) h2.actions[2].fx(H); // rawat satwa
  if (d === 6) h2.actions[1].fx(H); // sekat bakar 3
  H.health = h2.health(H);
  const targets = h2.targets.map(t => t.c(H));
  console.log(`Hari ${d}: prod=${H.prod.toFixed(1)}, api=${H.api.toFixed(1)}, herb=${H.herb.toFixed(1)}, pred=${H.pred.toFixed(1)}, HP=${H.health}%, T1=${targets[0]}, T2=${targets[1]}, T3=${targets[2]}`);
}
