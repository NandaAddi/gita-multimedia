/* ============================================================
   ECO-EXPLORER — js/config.js
   Konfigurasi, Helper Matematika, & Kamus Ikon SVG
   ============================================================ */

const el = s => document.querySelector(s);
const els = s => Array.from(document.querySelectorAll(s));
const c01 = v => Math.max(0, Math.min(1, v));
const cl = (v, a = 0, b = 100) => Math.max(a, Math.min(b, v));
const rnd = (a, b) => a + Math.random() * (b - a);
const lerp = (a, b, t) => a + (b - a) * t;
const frac = x => x - Math.floor(x);
const pr = i => frac(Math.sin(i * 127.1 + 311.7) * 43758.5453);
const pick = a => a[Math.floor(Math.random() * a.length)];
function mixc(a, b, t) {
  const A = parseInt(a.slice(1), 16), B = parseInt(b.slice(1), 16);
  const r = Math.round(lerp(A >> 16 & 255, B >> 16 & 255, t)),
        g = Math.round(lerp(A >> 8 & 255, B >> 8 & 255, t)),
        bl = Math.round(lerp(A & 255, B & 255, t));
  return 'rgb(' + r + ',' + g + ',' + bl + ')';
}

/* ================= IKON SVG ================= */
const ICONS = {
  drop: '<path d="M12 3C12 3 5 11 5 15a7 7 0 0 0 14 0C19 11 12 3 12 3Z"/>',
  sprout: '<path d="M12 21v-11"/><path d="M12 10C12 5 8 3 4 3c0 5 4 7 8 7Z"/><path d="M12 13c0-4 3-7 8-7 0 4-3 7-8 7Z"/>',
  mushroom: '<path d="M4 12a8 7 0 0 1 16 0Z"/><path d="M9 12v6a3 3 0 0 0 6 0v-6"/>',
  snake: '<path d="M4 18c2 0 2-4 5-4s3 4 6 4 3-4 5-4"/><circle cx="20" cy="14" r="1.6" fill="currentColor"/>',
  frog: '<circle cx="8" cy="7" r="2.2"/><circle cx="16" cy="7" r="2.2"/><path d="M4 12a8 6 0 0 0 16 0Z"/>',
  bottle: '<path d="M10 3h4v3l2 3v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V9l2-3Z"/><path d="M9 13h6"/>',
  bomb: '<circle cx="11" cy="14" r="7"/><path d="M15 8l2-3M17 5l2-1M17 5l-1-2"/>',
  net: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>',
  tree: '<path d="M12 3 6 11h3L5 17h14l-4-6h3Z"/><path d="M12 21v-4"/>',
  wave: '<path d="M3 9c3-3 6 3 9 0s6 3 9 0"/><path d="M3 15c3-3 6 3 9 0s6 3 9 0"/>',
  fish: '<path d="M4 12c3-5 9-5 12 0-3 5-9 5-12 0Z"/><path d="M16 12l4-3v6Z"/><circle cx="8" cy="11" r="1.1" fill="currentColor"/>',
  coral: '<path d="M12 21v-8M12 13 7 8M12 13l5-5M7 8V5M17 8V5M12 13V7"/>',
  paw: '<circle cx="7" cy="8" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="17" cy="8" r="2"/><path d="M12 21c-4 0-6-3-5-6 1-2 3-2 5-2s4 0 5 2c1 3-1 6-5 6Z"/>',
  sun: '<circle cx="12" cy="12" r="4.5"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.5 4.5l2 2M17.5 17.5l2 2M19.5 4.5l-2 2M6.5 17.5l-2 2"/>',
  star: '<path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8-6.1-3.5-6.1 3.5 1.4-6.8-5.1-4.7 6.9-.8Z" fill="currentColor" stroke="none"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h14v18H6a2 2 0 0 1-2-2Z"/><path d="M8 3v18"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-4 3-6 6.5-6s6.5 2 6.5 6"/><circle cx="17.5" cy="9" r="3"/><path d="M14.5 14.5c3.5 0 6.5 2 6.5 5.5"/>',
  sound: '<path d="M4 9v6h4l5 4V5L8 9Z"/><path d="M16 9a4 4 0 0 1 0 6"/><path d="M18.5 6.5a8 8 0 0 1 0 11"/>',
  mute: '<path d="M4 9v6h4l5 4V5L8 9Z"/><path d="M17 9l5 6M22 9l-5 6"/>',
  back: '<path d="M15 4 7 12l8 8"/>',
  arrowR: '<path d="M9 4l8 8-8 8"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
  pause: '<path d="M8 5v14M16 5v14"/>',
  check: '<path d="M4 12l5 5L20 6"/>',
  play: '<path d="M8 5l11 7-11 7Z"/>',
  medal: '<circle cx="12" cy="9" r="5"/><path d="M9 13.5 7 21l5-3 5 3-2-7.5"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/>',
  mag: '<circle cx="10" cy="10" r="6"/><path d="M14.5 14.5 21 21"/>',
  bin: '<path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"/><path d="M10 11v6M14 11v6"/>'
};

const ic = (n, s = 26) =>
  '<svg class="ic" width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
  (ICONS[n] || '') +
  '</svg>';

let CUR = 'title';
const CTX = {};
