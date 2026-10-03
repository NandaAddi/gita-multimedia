/* ============================================================
   ECO-EXPLORER — js/audio.js
   Web Audio API Synthesizer, Sound Effects, BGM, & TTS speak()
   ============================================================ */

let AC = null, audioReady = false, soundOn = true;

function ac() {
  if (!AC) AC = new (window.AudioContext || window.webkitAudioContext)();
  if (AC.state === 'suspended') AC.resume();
  return AC;
}

function tone(f, d, type = 'sine', vol = 0.12, dl = 0) {
  if (!soundOn || !audioReady) return;
  try {
    const a = ac(),
          o = a.createOscillator(),
          g = a.createGain();
    o.type = type;
    o.frequency.value = f;
    const t0 = a.currentTime + dl;
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(vol, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
    o.connect(g);
    g.connect(a.destination);
    o.start(t0);
    o.stop(t0 + d + 0.05);
  } catch (e) {}
}

function noiseHit(d, vol, fc) {
  if (!soundOn || !audioReady) return;
  try {
    const a = ac(),
          n = Math.floor(a.sampleRate * d),
          b = a.createBuffer(1, n, a.sampleRate),
          ch = b.getChannelData(0);
    for (let i = 0; i < n; i++) ch[i] = (Math.random() * 2 - 1) * (1 - i / n);
    const s = a.createBufferSource();
    s.buffer = b;
    const f = a.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = fc;
    const g = a.createGain();
    g.gain.value = vol;
    s.connect(f);
    f.connect(g);
    g.connect(a.destination);
    s.start();
  } catch (e) {}
}

const sfx = {
  click() {
    tone(660, 0.07, 'square', 0.05);
    tone(880, 0.06, 'square', 0.04, 0.05);
  },
  pop() {
    tone(500, 0.09, 'sine', 0.1);
    tone(760, 0.08, 'sine', 0.07, 0.06);
  },
  chime() {
    tone(880, 0.5, 'sine', 0.1);
    tone(1318, 0.7, 'sine', 0.05, 0.06);
  },
  success() {
    [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.22, 'triangle', 0.09, i * 0.1));
  },
  wrong() {
    tone(300, 0.2, 'sawtooth', 0.05);
    tone(220, 0.26, 'sawtooth', 0.05, 0.13);
  },
  star() {
    tone(1568, 0.24, 'triangle', 0.08);
    tone(2093, 0.3, 'triangle', 0.05, 0.09);
  },
  deny() {
    tone(180, 0.14, 'square', 0.06);
  },
  whoosh() {
    tone(440, 0.1, 'sine', 0.08);
    tone(660, 0.08, 'sine', 0.06, 0.03);
  }
};

let bgmTimer = null, bgmStep = 0;
const MELODY = [523, 659, 784, 880, 784, 659, 523, 0, 587, 784, 1046, 880, 784, 659, 587, 0];
const BASS = [131, 0, 98, 0, 131, 0, 98, 0, 110, 0, 131, 0, 110, 0, 98, 0];

function bgmStart() {
  if (bgmTimer) return;
  bgmTimer = setInterval(() => {
    if (!soundOn) {
      bgmStep++;
      return;
    }
    const m = MELODY[bgmStep % 16],
          b = BASS[bgmStep % 16];
    bgmStep++;
    if (m) tone(m, 0.2, 'triangle', 0.03);
    if (b) tone(b, 0.32, 'sine', 0.045);
  }, 230);
}

function speak(txt) {
  if (!soundOn || !('speechSynthesis' in window)) return;
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
  soundOn = !soundOn;
  syncSound();
  saveG();
  if (!soundOn) {
    try {
      speechSynthesis.cancel();
    } catch (e) {}
  }
}
