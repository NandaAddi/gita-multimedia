import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import Icon from '../common/Icons';
import Mascot from '../common/Mascot';
import FullscreenButton from '../common/FullscreenButton';
import { useQuiz } from '../../context/QuizContext';
import { useStudent } from '../../context/StudentContext';
import { ANGKET_URL } from '../../config/constants';

export default function ResultScreen() {
  const { deck, correctCount, xp, durationSecs, setScreen } = useQuiz();
  const { updateStore } = useStudent();

  const total = deck.length || 20;
  const pct = Math.round((correctCount / total) * 100);
  const radius = 84;
  const circumference = 2 * Math.PI * radius; // 527.788
  const strokeOffset = circumference * (1 - correctCount / total);

  // Jalankan confetti saat hasil muncul
  useEffect(() => {
    confetti({
      particleCount: pct >= 50 ? 100 : 40,
      spread: 70,
      origin: { y: 0.6 }
    });
    if (pct >= 85) {
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 90,
          origin: { y: 0.6 }
        });
      }, 700);
    }
  }, [pct]);

  const getTier = () => {
    if (pct >= 90) {
      return {
        title: 'Luar biasa!',
        msg: 'Kamu benar-benar master ekosistem! Oli sampai menari-nari karena bangga padamu.'
      };
    }
    if (pct >= 70) {
      return {
        title: 'Kerja bagus!',
        msg: 'Pemahamanmu tentang ekosistem sudah kuat. Ayo selesaikan langkah terakhir!'
      };
    }
    if (pct >= 50) {
      return {
        title: 'Tidak buruk!',
        msg: 'Fondasimu sudah ada. Terus semangat belajar dan amati alam sekitarmu!'
      };
    }
    return {
      title: 'Terus semangat!',
      msg: 'Belajar dari pengalaman itu bagian dari petualangan seorang detektif sains!'
    };
  };

  const tier = getTier();

  const handleOpenAngket = () => {
    window.open(ANGKET_URL, '_blank');
    updateStore({ angket: true });
  };

  const minutes = Math.floor(durationSecs / 60);
  const seconds = durationSecs % 60;
  const timeFormatted = `${minutes}:${String(seconds).padStart(2, '0')}`;

  return (
    <section className="screen active result-screen-wrap">
      <div className="result-inner">
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginBottom: '-8px' }}>
          <FullscreenButton size={22} />
        </div>
        <div className="res-hero">
          <div className="mascot-wrap res-mascot">
            <Mascot party={pct >= 70} cheer={pct >= 50} />
          </div>
          <div className="mode-chip">POSTTEST · EKOSISTEM</div>
          <h1 className="r-title">{tier.title}</h1>
          <p className="r-msg">{tier.msg}</p>
        </div>

        {/* Cincin Skor Bebas Layout Shift / Overlap */}
        <div className="ring">
          <svg viewBox="0 0 200 200">
            <circle className="track" cx="100" cy="100" r={radius} fill="none" strokeWidth="12" />
            <circle
              className="val"
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke={pct >= 70 ? '#58CC02' : pct >= 40 ? '#FFC800' : '#FF4B4B'}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeOffset}
            />
          </svg>
          <div className="ring-center">
            <div className="big">
              <span>{correctCount}</span>
              <span className="den">/{total}</span>
            </div>
            <div className="sub">JAWABAN BENAR</div>
          </div>
        </div>

        {/* Jalur Statistik */}
        <div className="stat-strip">
          <div className="stat">
            <div className="sv c-gold">{xp}</div>
            <div className="sl">
              <Icon name="star" size={15} /> XP
            </div>
          </div>
          <div className="stat">
            <div className="sv c-green">{pct}%</div>
            <div className="sl">
              <Icon name="target" size={15} /> AKURASI
            </div>
          </div>
          <div className="stat">
            <div className="sv c-blue">{timeFormatted}</div>
            <div className="sl">
              <Icon name="clock" size={15} /> WAKTU
            </div>
          </div>
        </div>

        {/* Tombol Aksi Utama: Angket Respon (Langkah Terakhir!) */}
        <div className="result-actions">
          <button
            className="btn btn-primary btn-angket-main"
            onClick={handleOpenAngket}
          >
            <Icon name="form" size={26} />
            <span>Langkah Terakhir! · Klik untuk Isi Angket Respon Siswa 📝</span>
          </button>

          <button className="btn btn-ghost" onClick={() => setScreen('home')}>
            Ke Beranda
          </button>
        </div>
      </div>
    </section>
  );
}
