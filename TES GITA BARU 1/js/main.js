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

      // Cek otomatis orientasi layar (tampilkan prompt putar layar jika vertikal di ponsel)
      const hint = el('#orient-hint');
      if(hint){
        const isPortrait = window.innerHeight > window.innerWidth && window.innerWidth <= 900;
        hint.style.display = isPortrait ? 'flex' : 'none';
      }
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

  const btnAbout = el('#btn-about');
  if (btnAbout) {
    btnAbout.onclick = () => {
      sfx.click();
      if (typeof buildAbout === 'function') buildAbout();
      go('about');
    };
  }

  // Proteksi debounce multi-click untuk layar sentuh IFP
  el('#t-snd').onclick = toggleSound;

  addEventListener('resize', fit);
  addEventListener('orientationchange', () => { setTimeout(fit, 200); });

  // Kontrol Layar Penuh (Fullscreen) untuk Android & Desktop
  function toggleFullScreen() {
    const doc = document;
    const docEl = doc.documentElement;
    const isFS = doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement;
    if (!isFS) {
      const req = docEl.requestFullscreen || docEl.webkitRequestFullscreen || docEl.mozRequestFullScreen || docEl.msRequestFullscreen;
      if (req) req.call(docEl).catch(() => {});
      if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').catch(() => {});
      }
    } else {
      const ex = doc.exitFullscreen || doc.webkitExitFullscreen || doc.mozCancelFullScreen || doc.msExitFullscreen;
      if (ex) ex.call(doc).catch(() => {});
    }
  }

  const fsBtn = el('#t-fs');
  if (fsBtn) fsBtn.onclick = toggleFullScreen;

  const forceLandscapeBtn = el('#btn-force-landscape');
  if (forceLandscapeBtn) {
    forceLandscapeBtn.onclick = () => {
      toggleFullScreen();
      const hint = el('#orient-hint');
      if (hint) hint.style.display = 'none';
    };
  }

  // Registrasi Service Worker PWA untuk offline play di Android
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
    navigator.serviceWorker.register('./sw.js').catch(err => {
      console.warn('[PWA] SW register error:', err);
    });
  }

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

  // Preloader & Penyiapan Aset Cerdas dengan Animasi Zoom-Out Logo UM (Strict Asset Readiness)
  function runPreloader(onDone) {
    const overlay = el('#preloader-overlay');
    if (!overlay) {
      if (onDone) onDone();
      return;
    }

    const fill = el('#preloader-bar-fill');
    const statusEl = el('#preloader-status');
    const pctEl = el('#preloader-pct');
    let progress = 12;
    let finished = false;
    let assetsReady = false;
    const startTime = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
    const minDuration = 2000; // 2.0s agar animasi zoom-out logo UM dinikmati optimal

    function setProgress(val, text) {
      if (val > progress) progress = val;
      if (fill) fill.style.width = Math.min(progress, 100) + '%';
      if (pctEl) pctEl.textContent = Math.round(Math.min(progress, 100)) + '%';
      if (text && statusEl) statusEl.textContent = text;
    }

    setProgress(15, 'Memuat modul pembelajaran IPAS...');

    function finishPreload() {
      if (finished) return;
      finished = true;
      setProgress(100, 'Semua Aset Siap! Siap Berpetualang...');
      setTimeout(() => {
        overlay.classList.add('fade-out');
        setTimeout(() => {
          overlay.style.display = 'none';
          if (onDone) onDone();
        }, 550);
      }, 320);
    }

    // Interaksi sentuh/klik: Hanya membuka kunci audio Web Audio.
    // TIDAK BISA melewati (skip) proses loading sebelum seluruh aset benar-benar siap!
    overlay.addEventListener('pointerdown', () => {
      unlockAudio();
      if (assetsReady) {
        finishPreload();
      }
    });

    // Helper pemuatan gambar statis
    function preloadImg(src) {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve({ src, ok: true });
        img.onerror = () => resolve({ src, ok: false });
        img.src = src;
      });
    }

    // Preload aset riil secara paralel (Strict Asset Readiness Gatekeeper)
    const tasks = [];

    // 1. Font antarmuka & tipografi IFP
    if (document.fonts && document.fonts.ready) {
      tasks.push(
        document.fonts.ready
          .then(() => setProgress(30, 'Memuat font & tipografi IFP...'))
          .catch(() => {})
      );
    }

    // 2. Citra Statis (Foto Profil Peneliti & Lambang Resmi UM)
    const staticImages = ['assets/Foto pas agita.webp', 'assets/Lambang-UM.webp'];
    const imgTasks = Promise.all(staticImages.map(preloadImg)).then(() => {
      setProgress(48, 'Memuat citra profil & lambang almamater...');
    });
    tasks.push(imgTasks);

    // 3. Preload sequence WebP Gita (168 Frame: Thinking, Talking, Worried)
    if (typeof GitaSeq !== 'undefined' && GitaSeq.preload) {
      const g1 = GitaSeq.preload({ folder: 'gita-thinking', prefix: 'g', pad: 3, ext: '.webp', frames: 48, fps: 12 })
        .then(() => setProgress(65, 'Menyiapkan animasi karakter Gita...'))
        .catch(() => {});
      const g2 = GitaSeq.preload({ folder: 'talking_loop', prefix: 'Comp 1_', pad: 5, ext: '.webp', frames: 60, fps: 12 })
        .then(() => setProgress(82, 'Memuat dialog ekspresi panduan...'))
        .catch(() => {});
      const g3 = GitaSeq.preload({ folder: 'worried_loop', prefix: 'Comp 1_', pad: 5, ext: '.webp', frames: 60, fps: 12 })
        .then(() => setProgress(94, 'Menginisialisasi simulasi 4 ekosistem...'))
        .catch(() => {});
      tasks.push(Promise.all([g1, g2, g3]));
    }

    // Menunggu seluruh aset 100% selesai dimuat sebelum memulai game
    Promise.all(tasks).then(() => {
      assetsReady = true;
      const now = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
      const elapsed = now - startTime;
      const remain = Math.max(0, minDuration - elapsed);
      setProgress(98, 'Memverifikasi kesiapan arena petualangan...');
      setTimeout(() => {
        finishPreload();
      }, remain);
    }).catch(() => {
      assetsReady = true;
      finishPreload();
    });

    // Failsafe timeout 15 detik (hanya untuk kondisi ekstrim jika jaringan sekolah terputus)
    setTimeout(() => {
      if (!finished) {
        assetsReady = true;
        finishPreload();
      }
    }, 15000);
  }

  const navigateToInitialScreen = () => {
    const p = new URLSearchParams(location.search).get('screen');
    if (p === 'tutorial') {
      buildTutorial();
      go('tutorial');
    } else if (p === 'team') {
      buildTeam();
      go('team');
    } else if (p === 'biome') {
      buildBiome();
      go('biome');
    } else if (p === 'sim') {
      const misId = new URLSearchParams(location.search).get('mission') || 'sawah-1';
      const targetMis = MISSIONS.find(m => m.id === misId) || MISSIONS[0];
      startSim(targetMis);
    } else {
      go('title');
    }
  };

  runPreloader(() => {
    navigateToInitialScreen();
  });

  requestAnimationFrame(loop);
}

// Eksekusi init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
