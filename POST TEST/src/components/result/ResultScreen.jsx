import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Icon from '../common/Icons';
import Mascot from '../common/Mascot';
import { useQuiz } from '../../context/QuizContext';
import { useStudent } from '../../context/StudentContext';
import { ANGKET_URL } from '../../config/constants';
import { topicOf, TOPICS } from '../../data/questions';

export default function ResultScreen() {
  const { deck, correctCount, xp, durationSecs, records, startQuiz, setScreen } = useQuiz();
  const { updateStore } = useStudent();

  const [stage, setStage] = useState('summary'); // 'summary' | 'review'
  const [reviewIndex, setReviewIndex] = useState(0);

  const total = deck.length || 20;
  const pct = Math.round((correctCount / total) * 100);
  const circumference = 439.82;
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

  // Keyboard navigation untuk review slider
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (stage !== 'review') return;
      if (e.key === 'ArrowLeft') {
        setReviewIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        setReviewIndex((prev) => Math.min(deck.length - 1, prev + 1));
      } else if (e.key === 'Escape') {
        setStage('summary');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stage, deck.length]);

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
        msg: 'Pemahamanmu tentang ekosistem sudah kuat. Cek lagi pembahasan biar makin sempurna!'
      };
    }
    if (pct >= 50) {
      return {
        title: 'Tidak buruk!',
        msg: 'Fondasimu sudah ada. Baca penjelasan di tinjauan soal lalu coba lagi ya!'
      };
    }
    return {
      title: 'Terus semangat!',
      msg: 'Belajar dari kesalahan itu bagian dari petualangan detektif. Baca penjelasannya ya!'
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

  const currentQ = deck[reviewIndex] || { q: '', opts: [], a: 0, why: '' };
  const currentRec = records[reviewIndex] || { picked: null, ok: false };
  const currentTopic = topicOf(reviewIndex);

  return (
    <section className="screen active">
      <div className="result-slider-wrap">
        <div
          className="result-slider-track"
          style={{ transform: `translateX(${stage === 'summary' ? '0%' : '-50%'})` }}
        >
          {/* SLIDE 1: RINGKASAN SKOR & ANGKET */}
          <div className="result-slide result-slide-summary">
            <div className="result-slide-inner">
              <div className="res-hero">
                <div className="mascot-wrap res-mascot">
                  <Mascot party={pct >= 70} cheer={pct >= 50} />
                </div>
                <div className="mode-chip">POSTTEST · EKOSISTEM</div>
                <h1 className="r-title">{tier.title}</h1>
                <p className="r-msg">{tier.msg}</p>
              </div>

              {/* Cincin Skor */}
              <div className="ring">
                <svg viewBox="0 0 170 170">
                  <circle className="track" cx="85" cy="85" r="70" fill="none" strokeWidth="12" />
                  <circle
                    className="val"
                    cx="85"
                    cy="85"
                    r="70"
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
                    <Icon name="star" size={13} /> XP
                  </div>
                </div>
                <div className="stat">
                  <div className="sv c-green">{pct}%</div>
                  <div className="sl">
                    <Icon name="target" size={13} /> AKURASI
                  </div>
                </div>
                <div className="stat">
                  <div className="sv c-blue">{timeFormatted}</div>
                  <div className="sl">
                    <Icon name="clock" size={13} /> WAKTU
                  </div>
                </div>
              </div>

              {/* Callout Angket Respon */}
              <div
                className="compare up"
                onClick={handleOpenAngket}
                title="Buka Angket Google Form"
              >
                <Icon name="form" size={22} />
                <span>
                  <b>Langkah Terakhir!</b> · Klik untuk Isi Angket Respon Siswa 📝
                </span>
              </div>

              {/* Tombol Aksi */}
              <div className="result-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => setStage('review')}
                >
                  🔍 TINJAU PEMBAHASAN 20 SOAL ➜
                </button>
                <div className="res-btn-row">
                  <button className="btn btn-ghost" onClick={startQuiz}>
                    Ulangi Posttest
                  </button>
                  <button className="btn btn-ghost" onClick={() => setScreen('home')}>
                    Ke Beranda
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SLIDE 2: SLIDER PEMBAHASAN SOAL 1-PER-1 */}
          <div className="result-slide result-slide-review">
            <div className="result-slide-inner">
              <div className="review-top-bar">
                <button
                  className="btn-back-clean"
                  onClick={() => setStage('summary')}
                  aria-label="Kembali ke Ringkasan Nilai"
                >
                  ⬅️ Skor
                </button>
                <span className="rev-badge">
                  PEMBAHASAN · SOAL {reviewIndex + 1} DARI {deck.length}
                </span>
              </div>

              {/* Strip Angka Soal 1..20 */}
              <div className="rev-pills-bar">
                {deck.map((_, i) => {
                  const rec = records[i] || { ok: false };
                  const isCur = i === reviewIndex;
                  return (
                    <button
                      key={i}
                      className={`rev-pill ${rec.ok ? 'ok' : 'wrong'} ${isCur ? 'active' : ''}`}
                      onClick={() => setReviewIndex(i)}
                      title={`Soal ${i + 1} (${rec.ok ? 'Benar' : 'Salah'})`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>

              {/* Kartu Soal Aktif */}
              <div className="rev-card" key={reviewIndex}>
                <span className={`rev-topic topic topic.t${currentTopic}`}>
                  {TOPICS[currentTopic]}
                </span>

                <h3 className="rev-question-text">{currentQ.q}</h3>

                {currentRec.ok ? (
                  <div className="rev-status-box ok">
                    <span>✅</span>
                    <div>
                      <div className="rev-box-lbl">JAWABANMU (TEPAT!)</div>
                      <div className="rev-box-txt">{currentQ.opts[currentRec.picked]}</div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="rev-status-box wrong">
                      <span>❌</span>
                      <div>
                        <div className="rev-box-lbl">JAWABANMU</div>
                        <div className="rev-box-txt">
                          {currentRec.picked !== null
                            ? currentQ.opts[currentRec.picked]
                            : 'Tidak dijawab'}
                        </div>
                      </div>
                    </div>
                    <div className="rev-status-box right-ans">
                      <span>✅</span>
                      <div>
                        <div className="rev-box-lbl">JAWABAN BENAR</div>
                        <div className="rev-box-txt">{currentQ.opts[currentQ.a]}</div>
                      </div>
                    </div>
                  </>
                )}

                {/* Kotak Penjelasan Sains */}
                {currentQ.why && (
                  <div className="rev-why-box">
                    <div className="why-title">💡 Penjelasan Detektif Sains:</div>
                    <p className="why-desc">{currentQ.why}</p>
                  </div>
                )}
              </div>

              {/* Tombol Navigasi Slider */}
              <div className="rev-nav-footer">
                <button
                  className="btn btn-ghost"
                  disabled={reviewIndex === 0}
                  onClick={() => setReviewIndex((prev) => Math.max(0, prev - 1))}
                >
                  ⬅️ SEBELUMNYA
                </button>
                <button
                  className="btn btn-primary"
                  disabled={reviewIndex === deck.length - 1}
                  onClick={() => setReviewIndex((prev) => Math.min(deck.length - 1, prev + 1))}
                >
                  SELANJUTNYA ➡️
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
