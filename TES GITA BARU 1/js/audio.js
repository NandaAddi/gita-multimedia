/* ============================================================
   ECO-EXPLORER — js/audio.js
   Web Audio API Synthesizer, Sound Effects, & TTS speak()
   100% Offline & Pure Synthesis (Pop-Free & Zero BGM Clash)
   ============================================================ */

let AC = null, audioReady = false, soundOn = true, acResuming = false;

function ac() {
  if (!AC) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) AC = new AudioCtx();
  }
  if (AC && AC.state === 'suspended' && !acResuming) {
    acResuming = true;
    AC.resume().then(() => { acResuming = false; }).catch(() => { acResuming = false; });
  }
  return AC;
}

function tone(f, d, type = 'sine', vol = 0.1, dl = 0) {
  if (!soundOn || !audioReady || !AC || AC.state !== 'running') return;
  try {
    const a = AC;

    const t0 = a.currentTime + Math.max(0, dl || 0);
    const o = a.createOscillator();
    const g = a.createGain();

    o.type = type;
    o.frequency.setValueAtTime(f, t0);

    // Mencegah pop 1.0 default: inisialisasi gain langsung ke 0
    g.gain.value = 0;
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(vol, t0 + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
    g.gain.setValueAtTime(0, t0 + d + 0.005);

    o.connect(g);
    g.connect(a.destination);

    o.start(t0);
    o.stop(t0 + d + 0.01);
  } catch (e) {}
}

function noiseHit(d, vol, fc) {
  if (!soundOn || !audioReady || !AC || AC.state !== 'running') return;
  try {
    const a = AC;

    const n = Math.floor(a.sampleRate * d),
          b = a.createBuffer(1, n, a.sampleRate),
          ch = b.getChannelData(0);
    for (let i = 0; i < n; i++) ch[i] = (Math.random() * 2 - 1) * (1 - i / n);
    const s = a.createBufferSource();
    s.buffer = b;
    const f = a.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = fc;
    const g = a.createGain();
    g.gain.setValueAtTime(vol, a.currentTime);
    g.gain.linearRampToValueAtTime(0, a.currentTime + d);
    s.connect(f);
    f.connect(g);
    g.connect(a.destination);
    s.start();
  } catch (e) {}
}

let lastSfxTime = 0;
function allowSfx(cooldown = 280) {
  const now = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
  if (now - lastSfxTime < cooldown) return false;
  lastSfxTime = now;
  return true;
}

const sfx = {
  click() {
    if (!allowSfx(280)) return;
    tone(560, 0.06, 'triangle', 0.08);
  },
  back() {
    if (!allowSfx(280)) return;
    tone(420, 0.07, 'triangle', 0.08);
  },
  pop() {
    tone(560, 0.06, 'sine', 0.1);
  },
  chime() {
    tone(880, 0.45, 'sine', 0.1);
    tone(1318, 0.6, 'sine', 0.05, 0.07);
  },
  success() {
    [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.2, 'triangle', 0.09, i * 0.09));
  },
  wrong() {
    tone(300, 0.18, 'sawtooth', 0.05);
    tone(220, 0.24, 'sawtooth', 0.05, 0.12);
  },
  star() {
    tone(1568, 0.22, 'triangle', 0.08);
    tone(2093, 0.28, 'triangle', 0.05, 0.08);
  },
  deny() {
    tone(180, 0.12, 'square', 0.06);
  },
  whoosh() {
    if (!allowSfx(200)) return;
    tone(460, 0.09, 'sine', 0.08);
  },
  grow() {
    [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.25, 'sine', 0.05, i * 0.08));
  },
  flee() {
    tone(700, 0.08, 'triangle', 0.04);
    tone(850, 0.08, 'triangle', 0.04, 0.07);
    tone(1000, 0.1, 'triangle', 0.03, 0.14);
  },
  wither() {
    tone(440, 0.3, 'sawtooth', 0.03);
    tone(370, 0.35, 'sawtooth', 0.03, 0.1);
    tone(293, 0.4, 'sine', 0.04, 0.22);
  },
  spray() {
    if (!soundOn || !audioReady || !AC || AC.state !== 'running') return;
    try {
      const a = AC;
      const d = 0.55;
      const n = Math.floor(a.sampleRate * d);
      const b = a.createBuffer(1, n, a.sampleRate);
      const ch = b.getChannelData(0);
      for (let i = 0; i < n; i++) {
        const env = Math.min(1, i / (a.sampleRate * 0.03)) * Math.pow(1 - i / n, 1.5);
        ch[i] = (Math.random() * 2 - 1) * env;
      }
      const s = a.createBufferSource();
      s.buffer = b;
      const f = a.createBiquadFilter();
      f.type = 'bandpass';
      f.frequency.setValueAtTime(2800, a.currentTime);
      f.frequency.exponentialRampToValueAtTime(1100, a.currentTime + d);
      f.Q.value = 1.4;
      const g = a.createGain();
      g.gain.setValueAtTime(0.09, a.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, a.currentTime + d);
      s.connect(f);
      f.connect(g);
      g.connect(a.destination);
      s.start();
      tone(1600, 0.1, 'sine', 0.025);
      tone(1100, 0.2, 'sine', 0.018, 0.06);
    } catch (e) {}
  }
};

// BGM Engine
let bgmAudio = null;
let bgmInitialized = false;

function initBGM() {
  if (!bgmInitialized && typeof window !== 'undefined') {
    bgmInitialized = true;
    try {
      bgmAudio = new Audio('backsound/bg-music.mp3');
      bgmAudio.loop = true;
      bgmAudio.volume = typeof G !== 'undefined' && G.bgmVol !== undefined ? G.bgmVol : 0.5;
    } catch(e) {}
  }
}

function bgmStart() {
  if (typeof window === 'undefined') return;
  initBGM();
  if (bgmAudio && bgmAudio.paused) {
    bgmAudio.play().catch(e => console.log('BGM wait interaction'));
  }
}

function bgmStop() {
  if (bgmAudio) bgmAudio.pause();
}

function setBgmVolume(val) {
  if (typeof G !== 'undefined') {
    G.bgmVol = Math.max(0, Math.min(1, val));
    if(typeof saveG === 'function') saveG();
  }
  if (bgmAudio) bgmAudio.volume = G.bgmVol;
}

/* ================= VOICE-OVER (VO) PLAYER ENGINE =================
   Smart VO Queue & Priority System
   - HIGH  : Musyawarah & Akhir Misi (interupsi langsung, reset antrian)
   - NORMAL: Target tercapai & Bridging (antri setelah audio saat ini selesai)
   - LOW   : Feedback umum (diabaikan jika antrian tidak kosong)
   Jeda natural 400ms antar audio agar tidak bertumpuk.
   Pop-Free & Non-Intrusive: hening tanpa error jika file belum ada.
*/

const VO_PRIORITY = {
  HIGH:   3,
  NORMAL: 2,
  LOW:    1
};

// Kunci yang termasuk HIGH priority
const VO_HIGH_KEYS = new Set([
  'vo_sim_vote_call', 'vo_sim_vote_done',
  'vo_sim_all_targets',
  'vo_sim_fail_time', 'vo_sim_fail_health'
]);

// Kunci yang termasuk NORMAL priority
const VO_NORMAL_KEYS = new Set([
  'vo_sim_target_ok'
]);

function getVOPriority(key) {
  if (VO_HIGH_KEYS.has(key)) return VO_PRIORITY.HIGH;
  // Semua kunci bridging (vo_bridge_*) = NORMAL
  if (VO_NORMAL_KEYS.has(key) || (typeof key === 'string' && key.startsWith('vo_bridge_'))) return VO_PRIORITY.NORMAL;
  return VO_PRIORITY.LOW;
}

let currentVO = null;
let _voQueue   = []; // [{key, onEnd, priority}]
let _voPlaying = false;
let _voGapTimer = null;

function stopVO() {
  // Bersihkan antrian
  _voQueue = [];
  _voPlaying = false;
  if (_voGapTimer) { clearTimeout(_voGapTimer); _voGapTimer = null; }
  if (currentVO) {
    try {
      currentVO.onended = null;
      currentVO.pause();
      currentVO.currentTime = 0;
    } catch (e) {}
    currentVO = null;
  }
}

const VO_POOL = new Map();

function _getVOAudio(key) {
  let audio = VO_POOL.get(key);
  if (!audio) {
    if (VO_POOL.size >= 40) {
      const oldestKey = VO_POOL.keys().next().value;
      const oldAudio = VO_POOL.get(oldestKey);
      if (oldAudio && typeof oldAudio.pause === 'function') { try { oldAudio.pause(); } catch(e){} }
      VO_POOL.delete(oldestKey);
    }
    audio = new Audio('voice-over/' + key + '.mp3');
    VO_POOL.set(key, audio);
  }
  return audio;
}

function _playNextInQueue() {
  if (!soundOn || _voQueue.length === 0) {
    _voPlaying = false;
    return;
  }
  _voPlaying = true;
  const { key, onEnd } = _voQueue.shift();
  const audio = _getVOAudio(key);
  currentVO = audio;
  try { audio.currentTime = 0; } catch (e) {}

  const _afterEnd = () => {
    if (currentVO === audio) currentVO = null;
    if (typeof onEnd === 'function') { try { onEnd(); } catch(e){} }
    // Jeda natural 400ms sebelum audio berikutnya
    _voGapTimer = setTimeout(_playNextInQueue, 400);
  };

  audio.onended = _afterEnd;
  audio.play().catch(() => {
    // Fallback path
    const fbKey = 'fb_' + key;
    let fallback = VO_POOL.get(fbKey);
    if (!fallback) {
      fallback = new Audio('assets/audio/vo/' + key + '.mp3');
      VO_POOL.set(fbKey, fallback);
    }
    currentVO = fallback;
    try { fallback.currentTime = 0; } catch (e) {}
    fallback.onended = _afterEnd;
    fallback.play().catch(() => {
      if (currentVO === fallback) currentVO = null;
      if (typeof onEnd === 'function') { try { onEnd(); } catch(e){} }
      _voGapTimer = setTimeout(_playNextInQueue, 400);
    });
  });
}

function playVO(key, onEnd, priority) {
  if (!soundOn || typeof window === 'undefined') return;
  const p = (priority !== undefined) ? priority : getVOPriority(key);

  if (p >= VO_PRIORITY.HIGH) {
    // HIGH: potong semua, langsung putar
    stopVO();
    _voQueue.push({ key, onEnd, priority: p });
    _playNextInQueue();
    return;
  }

  if (p === VO_PRIORITY.NORMAL) {
    // NORMAL: antri di belakang antrian yang ada
    _voQueue.push({ key, onEnd, priority: p });
    if (!_voPlaying) _playNextInQueue();
    return;
  }

  // LOW: hanya putar jika benar-benar idle
  if (!_voPlaying && _voQueue.length === 0) {
    _voQueue.push({ key, onEnd, priority: p });
    _playNextInQueue();
  }
  // Jika ada audio/antrian aktif, LOW priority diabaikan
}

function speak(txt) {
  // Fallback opsional jika TTS diperlukan secara eksplisit
  if (!soundOn || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    speechSynthesis.cancel();
    const clean = String(txt)
      .replace(/<[^>]+>/g, '')
      .replace(/[\u2605\u2713\u2022\u2192]/g, '')
      .slice(0, 220);
    const u = new SpeechSynthesisUtterance(clean);
    u.lang = 'id-ID';
    u.rate = 1;
    u.pitch = 1.12;
    speechSynthesis.speak(u);
  } catch (e) {}
}

function syncSound() {
  els('.snd-btn').forEach(b => {
    b.innerHTML = ic(soundOn ? 'sound' : 'mute', 26) + (soundOn ? ' Suara' : ' Bisu');
  });
}

function toggleSound() {
  openAudioSettings();
}

function openAudioSettings() {
  sfx.click();
  const r = modal('<h2>' + ic('sound', 34) + ' Pengaturan Audio</h2>'
    + '<div style="margin:24px 0; text-align:left;">'
    + '<label style="display:block;margin-bottom:8px;font-size:24px;font-weight:700;color:#fff;">Volume Musik (BGM):</label>'
    + '<input type="range" id="bgm-slider" min="0" max="1" step="0.05" value="'+(typeof G!=='undefined'?G.bgmVol:0.5)+'" style="width:100%; height:12px; accent-color:var(--gold);cursor:pointer;">'
    + '</div>'
    + '<div style="margin:24px 0; text-align:left;">'
    + '<label style="display:block;margin-bottom:8px;font-size:24px;font-weight:700;color:#fff;">Suara Efek (SFX & VO):</label>'
    + '<button class="btn '+(soundOn?'btn-gold':'btn-ruby')+'" id="btn-toggle-sfx" style="width:100%;font-size:24px;padding:16px;">'
    + ic(soundOn ? 'sound' : 'mute', 24) + (soundOn ? ' Nyala' : ' Bisu') + '</button>'
    + '</div>'
    + '<div class="mrow"><button class="btn btn-gold" data-close>Tutup</button></div>'
  );
  
  const sl = r.querySelector('#bgm-slider');
  sl.oninput = (e) => {
    setBgmVolume(e.target.value);
  };
  
  const btn = r.querySelector('#btn-toggle-sfx');
  btn.onclick = () => {
    soundOn = !soundOn;
    syncSound();
    if(typeof saveG==='function') saveG();
    btn.innerHTML = ic(soundOn ? 'sound' : 'mute', 24) + (soundOn ? ' Nyala' : ' Bisu');
    btn.className = 'btn ' + (soundOn ? 'btn-gold' : 'btn-ruby');
    if (!soundOn) {
      stopVO();
      try { speechSynthesis.cancel(); if (AC && AC.state === 'running') AC.suspend(); } catch(e){}
    } else {
      bgmStart();
      try { if (AC && AC.state === 'suspended') AC.resume(); } catch(e){}
      sfx.click();
    }
  };
}
