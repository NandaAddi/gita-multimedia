// ============================================================
// tests/test_listener_idempotency.js
// Verifikasi Idempotensi Event Listener di Simulation Scene
// ============================================================
const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('=== TEST: IDEMPOTENSI EVENT LISTENER SIMULATION ===');

const simCode = fs.readFileSync(path.join(__dirname, '../js/scenes/simulation.js'), 'utf8');

// 1. Verifikasi #stat-rows tidak menggunakan addEventListener('click')
assert.strictEqual(
  simCode.includes("el('#stat-rows').addEventListener('click'"),
  false,
  "Tidak boleh ada addEventListener('click') berulang pada #stat-rows saat startSim dipanggil"
);

// 2. Verifikasi #stat-rows menggunakan penugasan idempotent .onclick
assert.strictEqual(
  simCode.includes(".onclick =") && simCode.includes("statRows"),
  true,
  "#stat-rows harus menggunakan penugasan idempotent (.onclick) agar tidak menumpuk saat retry misi"
);

console.log('✓ PASS: Event listener stat-rows bersifat idempotent tanpa memory leak');
