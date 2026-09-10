/**
 * ECO-EXPLORER AUDIO & VOICE-OVER ENGINE (16-Bit Retro Chiptune & Web Speech API)
 * 100% Offline synthesizer for IFP classroom immersion.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.synth = window.speechSynthesis || null;
    this.currentUtterance = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, type = 'square', duration = 0.15, vol = 0.15) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type; // 'square', 'sine', 'triangle', 'sawtooth'
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio tone error:', e);
    }
  }

  playBeep() {
    this.playTone(520, 'square', 0.08, 0.12);
  }

  playSuccess() {
    if (this.muted) return;
    this.init();
    const notes = [440, 554, 659, 880];
    notes.forEach((note, idx) => {
      setTimeout(() => this.playTone(note, 'triangle', 0.18, 0.15), idx * 80);
    });
  }

  playWarning() {
    if (this.muted) return;
    this.init();
    this.playTone(300, 'sawtooth', 0.18, 0.2);
    setTimeout(() => this.playTone(220, 'sawtooth', 0.25, 0.2), 120);
  }

  playCrisisAlarm() {
    if (this.muted) return;
    this.init();
    this.playTone(700, 'square', 0.1, 0.2);
    setTimeout(() => this.playTone(500, 'square', 0.1, 0.2), 100);
    setTimeout(() => this.playTone(700, 'square', 0.15, 0.2), 200);
  }

  playDecomposeMagic() {
    if (this.muted) return;
    this.init();
    const sparkles = [600, 750, 900, 1100, 1300];
    sparkles.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 'sine', 0.12, 0.12), i * 60);
    });
  }

  playVictoryFanfare() {
    if (this.muted) return;
    this.init();
    const melody = [
      { f: 523, d: 0.15 },
      { f: 523, d: 0.15 },
      { f: 523, d: 0.15 },
      { f: 659, d: 0.35 },
      { f: 587, d: 0.2 },
      { f: 659, d: 0.2 },
      { f: 784, d: 0.5 }
    ];
    let time = 0;
    melody.forEach(item => {
      setTimeout(() => this.playTone(item.f, 'triangle', item.d, 0.2), time * 1000);
      time += item.d + 0.05;
    });
  }

  /**
   * Text-to-Speech Voice-Over (🔊) Berbasis Mayer Voice Principle (#11)
   * Vokal hangat, ceria, dan artikulasi jelas untuk speaker IFP di ruang kelas.
   */
  speakText(text, onEnd) {
    if (!this.synth) return;
    try {
      this.synth.cancel(); // batalkan suara sebelumnya
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'id-ID';
      utter.rate = 0.92;   // Artikulasi lebih tenang dan jelas untuk ruang kelas
      utter.pitch = 1.22;  // Karakter vokal hangat dan bersahabat seperti teman sebaya
      utter.volume = 1.0;
      if (onEnd) utter.onend = onEnd;
      this.currentUtterance = utter;
      this.synth.speak(utter);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  }

  playChime() {
    if (this.muted) return;
    this.init();
    // Nada bel kelas yang jernih dan menarik perhatian seluruh siswa (CSCL)
    const bellNotes = [523, 659, 784, 1046];
    bellNotes.forEach((f, idx) => {
      setTimeout(() => this.playTone(f, 'sine', 0.28, 0.22), idx * 100);
    });
  }

  playChomp() {
    if (this.muted) return;
    this.init();
    // Efek suara kunyah/predasi alami organisme (Piaget Concrete)
    this.playTone(180, 'square', 0.08, 0.2);
    setTimeout(() => this.playTone(140, 'triangle', 0.1, 0.25), 70);
  }

  /**
   * Hybrid Dual-Engine Voice-Over (Mayer Voice Principle #11):
   * 1. Utama: Putar file audio rekaman studio asli/AI via Base64 window.VO_DATA atau assets/voice-over/
   * 2. Cadangan: Fallback otomatis ke Web Speech API jika file audio gagal diputar
   */
  playVO(key, fallbackText, onEnd) {
    if (this.muted) return;
    this.init();
    this.stopVoice();

    let audioSrc = null;
    if (window.VO_DATA && window.VO_DATA[key]) {
      audioSrc = window.VO_DATA[key];
    } else {
      audioSrc = `assets/voice-over/${key}.wav`;
    }

    try {
      const audio = new Audio();
      audio.src = audioSrc;
      this.currentAudio = audio;

      audio.onended = () => {
        this.currentAudio = null;
        if (onEnd) onEnd();
      };

      audio.onerror = (e) => {
        console.warn(`[SoundEngine] Audio lokal ${key} gagal, fallback ke TTS:`, e);
        this.currentAudio = null;
        if (fallbackText) {
          this.speakText(fallbackText, onEnd);
        }
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn(`[SoundEngine] Autoplay/format error pada ${key}, fallback ke TTS:`, err);
          this.currentAudio = null;
          if (fallbackText) {
            this.speakText(fallbackText, onEnd);
          }
        });
      }
    } catch (err) {
      console.warn(`[SoundEngine] Exception playing ${key}:`, err);
      this.currentAudio = null;
      if (fallbackText) {
        this.speakText(fallbackText, onEnd);
      }
    }
  }

  stopVoice() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (e) {}
      this.currentAudio = null;
    }
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {}
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted) this.stopVoice();
    return this.muted;
  }
}

window.soundEngine = new SoundEngine();
