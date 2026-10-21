/* ============================================================
   ECO-EXPLORER — js/state.js
   State Global, Penyimpanan LocalStorage, Modal, & Toast
   ============================================================ */

const G = { team: null, stars: {}, sound: true, bgmVol: 0.5, toursSeen: {} };
let NAV = { biome: 'sawah' };

function loadG() {
  try {
    const d = JSON.parse(localStorage.getItem('eco.save') || '{}');
    if (d && typeof d === 'object') {
      G.team = typeof d.team === 'string' && typeof TEAMS !== 'undefined' && TEAMS.some(t => t.id === d.team) ? d.team : null;
      G.stars = {};
      if (d.stars && typeof d.stars === 'object' && typeof MISSIONS !== 'undefined') {
        Object.keys(d.stars).forEach(k => {
          const v = +d.stars[k];
          if (MISSIONS.some(m => m.id === k) && Number.isFinite(v)) {
            G.stars[k] = Math.max(0, Math.min(3, Math.round(v)));
          }
        });
      }
      G.sound = d.sound !== false;
      G.bgmVol = typeof d.bgmVol === 'number' ? d.bgmVol : 0.5;
      G.toursSeen = (d.toursSeen && typeof d.toursSeen === 'object') ? d.toursSeen : {};
    }
  } catch (e) {
    console.error('[Eco-Explorer] load save gagal', e);
  }
}

function saveG() {
  try {
    localStorage.setItem(
      'eco.save',
      JSON.stringify({ team: G.team, stars: G.stars, sound: typeof soundOn !== 'undefined' ? soundOn : true, bgmVol: G.bgmVol, toursSeen: G.toursSeen || {} })
    );
  } catch (e) {}
}

function totStars() {
  if (typeof MISSIONS === 'undefined') return 0;
  return MISSIONS.reduce((s, m) => s + (G.stars[m.id] || 0), 0);
}

function unlocked(i) {
  if (i === 0) return true;
  if (typeof MISSIONS === 'undefined') return false;
  return (G.stars[MISSIONS[i - 1].id] || 0) > 0;
}

const ECO_FACTS = [
  "Padi adalah produsen utama! Mereka membuat makanannya sendiri melalui fotosintesis dengan bantuan sinar matahari.",
  "Belalang dan burung pipit adalah konsumen primer pemakan padi. Jika populasinya meledak, tanaman padi bisa habis!",
  "Katak dan burung hantu adalah sahabat petani karena mereka memangsa serangga hama dan tikus secara alami.",
  "Ular sawah membantu petani dengan memangsa tikus. Jangan diburu, ya, agar tikus tidak merusak sawah!",
  "Burung elang berada di puncak rantai makanan sawah dan menjaga keseimbangan seluruh populasi di bawahnya.",
  "Jamur dan cacing adalah dekomposer (pengurai) yang mengubah sisa makhluk hidup menjadi pupuk alami tanah.",
  "Penggunaan racun pestisida berlebihan bisa membunuh serangga baik dan mencemari aliran air sawah!",
  "Air, tanah, dan cahaya matahari adalah komponen abiotik yang sangat penting bagi pertumbuhan padi.",
  "Keseimbangan ekosistem terjadi jika jumlah produsen selalu lebih banyak dibanding jumlah konsumen.",
  "Detektif Alam yang cermat selalu mengamati hubungan timbal balik makhluk hidup sebelum bertindak!"
];

const LOADER_TITLES = [
  "Memuat Petualangan...",
  "Memeriksa Ekosistem Sawah...",
  "Detektif Gita Sedang Bersiap...",
  "Membuka Catatan Alam...",
  "Menghubungkan Rantai Makanan..."
];

const LOADER_DURATION = 3200; // 3.2 detik: waktu nyaman membaca fakta sains bagi siswa SD Kelas 5
let lastNavTime = 0;
let isNavigating = false;
let loaderSwitchTimeout = null;
let loaderDismissTimeout = null;
let loaderCleanupTimeout = null;

function dismissLoader() {
  const overlay = el('#scene-loader-overlay');
  if (!overlay || !overlay.classList.contains('active')) return;

  clearTimeout(loaderDismissTimeout);
  clearTimeout(loaderCleanupTimeout);

  const fill = el('#loader-progress-fill');
  if (fill) fill.style.width = '100%';

  overlay.classList.remove('active');

  loaderCleanupTimeout = setTimeout(() => {
    if (typeof GitaSeq !== 'undefined' && GitaSeq.stop) {
      GitaSeq.stop('#loader-gita-box');
    }
    isNavigating = false;
  }, 240);
}

const SCENE_CLEANUP = {};
try {
  if (typeof window !== 'undefined') window.SCENE_CLEANUP = SCENE_CLEANUP;
} catch (e) {}

function applyScreenSwitch(id) {
  // 1. Eksekusi hook pembersihan scene lama
  if (CUR && typeof SCENE_CLEANUP[CUR] === 'function') {
    try {
      SCENE_CLEANUP[CUR]();
    } catch (e) {
      console.warn('[Cleanup][' + CUR + ']', e);
    }
  }

  const currentSc = el('#scr-' + id);
  els('.screen').forEach(s => s.classList.remove('active'));
  const sc = currentSc || el('#scr-' + id);
  if (sc) sc.classList.add('active');
  CUR = id;
  // Gita image-sequence lifecycle (pilot title): hemat CPU saat pindah screen,
  // replay otomatis saat kembali ke title.
  try {
    if (typeof GitaSeq !== 'undefined') {
      if (id === 'title') {
        if (typeof titleBubble === 'function') titleBubble();
      } else {
        GitaSeq.stop('#gita-title');
        if (id !== 'sim') GitaSeq.stop('#bridge-gita-box');
      }
    }
  } catch (e) {}
}

function go(id, instant = false) {
  const now = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
  const currentSc = el('#scr-' + id);
  if (CUR === id && currentSc && currentSc.classList.contains('active')) return;
  if (isNavigating && !instant) return; // Proteksi debounce layar sentuh IFP

  lastNavTime = now;
  if (typeof stopVO === 'function') stopVO();

  const overlay = el('#scene-loader-overlay');
  if (instant || !overlay) {
    applyScreenSwitch(id);
    return;
  }

  isNavigating = true;

  // Acak teks judul dan fakta edukatif
  const titleEl = el('#loader-title');
  const factEl = el('#loader-fact-text');
  if (titleEl) {
    titleEl.textContent = LOADER_TITLES[Math.floor(Math.random() * LOADER_TITLES.length)];
  }
  if (factEl) {
    factEl.textContent = ECO_FACTS[Math.floor(Math.random() * ECO_FACTS.length)];
  }

  // Animasi progress bar membaca (3.2s)
  const fill = el('#loader-progress-fill');
  if (fill) {
    fill.style.transition = 'none';
    fill.style.width = '0%';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (fill) {
          fill.style.transition = `width ${LOADER_DURATION}ms linear`;
          fill.style.width = '100%';
        }
      });
    });
  }

  // Tampilkan overlay dan mulai animasi sequence Gita
  overlay.classList.add('active');
  if (typeof GitaSeq !== 'undefined' && GitaSeq.play) {
    GitaSeq.play('#loader-gita-box', {
      folder: 'assets/animations/loading',
      prefix: 'gita_load_',
      pad: 3,
      ext: '.webp',
      frames: 42,
      size: 240,
      fps: 22
    });
  }

  // Proteksi: izinkan tap to skip setelah 400ms agar sentuhan awal tidak langsung menutup
  let canTapToSkip = false;
  setTimeout(() => { canTapToSkip = true; }, 400);
  overlay.onclick = () => {
    if (canTapToSkip) dismissLoader();
  };

  clearTimeout(loaderSwitchTimeout);
  clearTimeout(loaderDismissTimeout);
  clearTimeout(loaderCleanupTimeout);

  // 1. Ganti tampilan DOM di balik layar setelah overlay tertutup penuh (250ms)
  loaderSwitchTimeout = setTimeout(() => {
    applyScreenSwitch(id);
  }, 250);

  // 2. Beri waktu membaca nyaman selama LOADER_DURATION (3.2 detik) lalu tutup otomatis
  loaderDismissTimeout = setTimeout(() => {
    dismissLoader();
  }, LOADER_DURATION);
}

let toastT1 = null, toastT2 = null;
function toast(msg, ms = 2800) {
  const r = el('#toast-root');
  if (!r) return;
  r.innerHTML = '<div class="toast" title="Ketuk untuk menutup">' + msg + '</div>';
  clearTimeout(toastT1);
  clearTimeout(toastT2);
  const t = r.firstChild;
  if (t) {
    t.onclick = () => {
      t.style.opacity = '0';
      clearTimeout(toastT1);
      clearTimeout(toastT2);
      toastT2 = setTimeout(() => { r.innerHTML = ''; }, 200);
    };
  }
  toastT1 = setTimeout(() => {
    if (t) t.style.opacity = '0';
  }, ms);
  toastT2 = setTimeout(() => {
    r.innerHTML = '';
  }, ms + 400);
}

function modal(html, slim) {
  const r = el('#modal-root');
  if (!r) return null;
  const wasOpen = r.classList.contains('show');
  r.innerHTML =
    '<div class="dim"></div><div class="modal-wrap"><div class="modal panel' +
    (slim ? ' slim' : '') +
    '">' +
    html +
    '</div></div>';
  r.classList.add('show');
  const dim = r.querySelector('.dim');
  if (dim) dim.onclick = closeModal;
  r.querySelectorAll('[data-close]').forEach(b => (b.onclick = closeModal));
  if (CUR === 'sim' && typeof SIM !== 'undefined' && SIM && !wasOpen) SIM.mp++;
  return r;
}

function closeModal() {
  const r = el('#modal-root');
  if (!r || !r.classList.contains('show')) return;
  if (CUR === 'sim' && typeof SIM !== 'undefined' && SIM && SIM.mp > 0) SIM.mp--;
  r.classList.remove('show');
  r.innerHTML = '';
}

try {
  if (typeof window !== 'undefined') window.closeModal = closeModal;
} catch (e) {}
