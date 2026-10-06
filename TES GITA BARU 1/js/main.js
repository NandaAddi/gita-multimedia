/* ============================================================
   ECO-EXPLORER — js/main.js
   Entry Point, Responsive Canvas Fitting, Render Loop, & Bootstrapper
   ============================================================ */

let fitQueued = false;
function fit(){
  if(fitQueued) return;
  fitQueued = true;
  requestAnimationFrame(() => {
    fitQueued = false;
    try {
      const s = Math.min(innerWidth / 1920, innerHeight / 1080);
      const st = el('#stage');
      if(st) st.style.transform = 'translate(-50%,-50%) scale(' + s + ')';
    } catch(e) {}
  });
}

const TITLE_S = {prod: 48, water: 68, herb: 12, pred: 6, poison: 0};
let loopN = 0;
function loop(t){
  try {
    if(!document.hidden){
      loopN++;
      if(CUR === 'title' || CUR === 'mission'){
        if(el('#cv-title')) el('#cv-title').style.filter = CUR === 'mission' ? 'blur(16px) brightness(0.4)' : 'none';
        const b = (CUR === 'mission' && NAV.biome) ? NAV.biome : 'sawah';
        const s = (CUR === 'mission' && NAV.biome && typeof FAKE !== 'undefined') ? FAKE[NAV.biome] : TITLE_S;
        if(typeof SCENE !== 'undefined' && SCENE[b]) SCENE[b](CTX.title, t, s);
      } else if(CUR === 'sim' && SIM){
        SCENE[SIM.m.biome](CTX.sim, t, SIM.S);
      } else if(CUR === 'biome' && loopN % 6 === 0){
        PREVS.forEach(p => drawPreview(p, t));
      } else if(CUR === 'team'){
        if(typeof animateTeamMascot === 'function') animateTeamMascot(t);
      } else if(CUR === 'victory'){
        renderConfetti(t);
      }
    }
  } catch(e) {
    console.error('[Eco-Explorer][' + CUR + ']', e);
  }
  requestAnimationFrame(loop);
}

/* ================= INISIALISASI ================= */
function init(){
  loadG();
  soundOn = G.sound !== false;
  fit();

  CTX.title = el('#cv-title').getContext('2d');
  CTX.sim = el('#cv-sim').getContext('2d');
  CTX.conf = el('#cv-confetti').getContext('2d');

  try {
    ['#cv-title', '#cv-sim', '#cv-confetti'].forEach(id => {
      const cv = el(id);
      if(cv && (cv.width !== 1920 || cv.height !== 1080)){
        console.warn('[Eco-Explorer] canvas ' + id + ' berukuran ' + cv.width + 'x' + cv.height + ', seharusnya 1920x1080');
      }
    });
  } catch(e) {}

  titleBubble();
  syncSound();

  el('#btn-start').onclick = () => {
    sfx.click();
    buildTeam();
    go('team');
  };

  el('#btn-how').onclick = () => {
    sfx.click();
    buildHow();
    go('how');
  };

  el('#btn-teacher').onclick = () => {
    sfx.click();
    buildTeacher();
    go('teacher');
  };

  el('#t-snd').onclick = toggleSound;

  addEventListener('resize', fit);
  addEventListener('orientationchange', fit);
  function unlockAudio() {
    if(audioReady) return;
    audioReady = true;
    try { ac(); } catch(e) {}
    if (typeof bgmStart === 'function') bgmStart();
    removeEventListener('pointerdown', unlockAudio);
    removeEventListener('click', unlockAudio);
    removeEventListener('keydown', unlockAudio);
  }
  addEventListener('pointerdown', unlockAudio);
  addEventListener('click', unlockAudio);
  addEventListener('keydown', unlockAudio);

  document.addEventListener('visibilitychange', () => {
    try {
      if(!AC) return;
      if(document.hidden) AC.suspend();
      else if(audioReady && soundOn) AC.resume();
    } catch(e) {}
  });

  const p = new URLSearchParams(location.search).get('screen');
  if(p === 'tutorial'){
    buildTutorial();
    go('tutorial');
  } else if(p === 'team'){
    buildTeam();
    go('team');
  } else if(p === 'biome'){
    buildBiome();
    go('biome');
  } else if(p === 'sim'){
    const misId = new URLSearchParams(location.search).get('mission') || 'sawah-1';
    const targetMis = MISSIONS.find(m => m.id === misId) || MISSIONS[0];
    startSim(targetMis);
  } else {
    go('title');
  }

  requestAnimationFrame(loop);
}

// Eksekusi init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
