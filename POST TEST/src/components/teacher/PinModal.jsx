import React, { useState, useEffect } from 'react';
import { TEACHER_PIN } from '../../config/constants';

export default function PinModal({ isOpen, onClose, onSuccess }) {
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      setPin('');
      setErrorMsg('');
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pin.trim()) return;
    if (pin.trim() !== TEACHER_PIN) {
      setErrorMsg('PIN salah! Masukkan PIN guru yang benar.');
      return;
    }
    onSuccess();
    onClose();
  };

  return (
    <div
      className="pin-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="pin-card">
        <h3>🔒 Akses Panel Guru</h3>
        <p>Masukkan PIN keamanan untuk melihat rekapitulasi data nilai siswa.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            className="pin-input"
            placeholder="••••"
            maxLength={6}
            inputMode="numeric"
            value={pin}
            onChange={(e) => {
              setPin(e.target.value);
              setErrorMsg('');
            }}
            autoFocus
          />
          <div className="pin-err">{errorMsg}</div>
          <button type="submit" className="btn btn-primary pin-submit">
            MASUK
          </button>
        </form>
      </div>
    </div>
  );
}
