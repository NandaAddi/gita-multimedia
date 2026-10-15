import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { STORE_KEY } from '../config/constants';

const SoundContext = createContext();

export function SoundProvider({ children }) {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
      return saved.sound !== undefined ? saved.sound : true;
    } catch {
      return true;
    }
  });

  const actxRef = useRef(null);

  const getAudioContext = () => {
    if (!actxRef.current) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        actxRef.current = new AudioCtx();
      } catch (e) {
        console.warn('AudioContext not supported', e);
      }
    }
    if (actxRef.current && actxRef.current.state === 'suspended') {
      actxRef.current.resume();
    }
    return actxRef.current;
  };

  const playTone = (f, start, dur, type = 'sine', vol = 0.2, glideTo = null) => {
    if (!soundEnabled) return;
    const c = getAudioContext();
    if (!c) return;
    const t = c.currentTime + start;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f, t);
    if (glideTo) {
      o.frequency.exponentialRampToValueAtTime(glideTo, t + dur);
    }
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(c.destination);
    o.start(t);
    o.stop(t + dur + 0.05);
  };

  const sfx = {
    tap: () => playTone(520, 0, 0.06, 'sine', 0.08),
    correct: () => {
      playTone(523.25, 0, 0.12, 'sine', 0.22);
      playTone(659.25, 0.1, 0.12, 'sine', 0.22);
      playTone(783.99, 0.2, 0.26, 'sine', 0.22);
    },
    wrong: () => {
      playTone(200, 0, 0.28, 'sawtooth', 0.1, 120);
      playTone(150, 0.05, 0.3, 'square', 0.05, 90);
    },
    finish: () => {
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
        playTone(f, i * 0.13, i === 3 ? 0.5 : 0.14, 'sine', 0.2)
      );
    }
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        const curr = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
        curr.sound = next;
        localStorage.setItem(STORE_KEY, JSON.stringify(curr));
      } catch (e) {
        console.warn(e);
      }
      if (next) sfx.tap();
      return next;
    });
  };

  useEffect(() => {
    const handleFirstGesture = () => getAudioContext();
    window.addEventListener('pointerdown', handleFirstGesture, { once: true });
    return () => window.removeEventListener('pointerdown', handleFirstGesture);
  }, []);

  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound, sfx }}>
      {children}
    </SoundContext.Provider>
  );
}

export const useSound = () => useContext(SoundContext);
