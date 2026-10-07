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

let lastNavTime = 0;
function go(id) {
  const now = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
  const currentSc = el('#scr-' + id);
  if (CUR === id && currentSc && currentSc.classList.contains('active') && now - lastNavTime < 250) return;
  lastNavTime = now;
  if (typeof stopVO === 'function') stopVO();
  els('.screen').forEach(s => s.classList.remove('active'));
  const sc = currentSc || el('#scr-' + id);
  if (sc) sc.classList.add('active');
  CUR = id;
  // Gita image-sequence lifecycle (pilot title): hemat CPU saat pindah screen,
  // replay otomatis saat kembali ke title.
  try{
    if(typeof GitaSeq !== 'undefined'){
      if(id === 'title'){
        if(typeof titleBubble === 'function') titleBubble();
      } else {
        GitaSeq.stop('#gita-title');
        if(id !== 'sim') GitaSeq.stop('#bridge-gita-box');
      }
    }
  }catch(e){}
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
