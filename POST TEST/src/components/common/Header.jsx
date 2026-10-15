import React from 'react';
import Icon from './Icons';
import { useSound } from '../../context/SoundContext';

export default function Header() {
  const { soundEnabled, toggleSound } = useSound();

  return (
    <div className="home-top">
      <div className="brand">
        <Icon name="leaf" size={18} />
        <span>IPAS · FASE C · KELAS V</span>
      </div>
      <button
        className="icon-btn"
        onClick={toggleSound}
        aria-label="Pengaturan Suara"
        title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
      >
        <Icon name={soundEnabled ? 'vol' : 'volOff'} size={22} />
      </button>
    </div>
  );
}
