import React, { useState } from 'react';
import Header from '../common/Header';
import Mascot from '../common/Mascot';
import Modal from '../common/Modal';
import CheckpointPath from './CheckpointPath';
import RulesCard from './RulesCard';
import { useStudent } from '../../context/StudentContext';
import { useQuiz } from '../../context/QuizContext';

export default function HomeScreen({ onOpenTeacherPin }) {
  const { siswa, dbStatus } = useStudent();
  const { setScreen } = useQuiz();
  const [step, setStep] = useState(0); // 0 = Welcome & Rules, 1 = Checkpoints

  return (
    <section className="screen active">
      <div className="home-slider-wrap">
        <div
          className="home-slider-track"
          style={{ transform: `translateX(-${step * 50}%)` }}
        >
          {/* SLIDE 1: Sambutan, Judul, Aturan & Identitas */}
          <div className="home-slide home-slide-1">
            <div className="home-slide-inner">
              <Header>
                <div className="slide-dots" aria-label="Langkah 1 dari 2">
                  <span className="slide-dot active" />
                  <span className="slide-dot" />
                </div>
              </Header>

              <div className="hero">
                <div className="mascot-wrap">
                  <Mascot />
                </div>
                <div className="bubble">
                  Halo, sahabat alam! Aku <b>Oli</b>. Ayo buktikan pemahaman ekosistemmu di evaluasi ini!
                </div>
              </div>

              <div className="title-group">
                <h1 className="display">
                  EKO<span className="g">SISTEM</span>
                </h1>
                <p className="subtitle">Ilmu Pengetahuan Alam &amp; Sosial · Kelas V SD · Fase C</p>
              </div>

              <RulesCard />

              {/* Tag Identitas Siswa */}
              {siswa && siswa.nama ? (
                <div className="siswa-tag">
                  <span>👤</span>
                  <span>
                    {siswa.nama} · {siswa.kelas} · No. {siswa.absen}
                  </span>
                  <span className={`db-status ${dbStatus}`}>
                    ⬤ {dbStatus === 'ok' ? 'online' : dbStatus === 'saving' ? 'simpan...' : 'offline'}
                  </span>
                  <button
                    className="change-btn"
                    onClick={() => setScreen('identity')}
                    title="Ubah identitas siswa"
                  >
                    Ganti
                  </button>
                </div>
              ) : (
                <div className="siswa-tag" style={{ background: '#E0F2FE', color: '#0369A1' }}>
                  <span>👤</span>
                  <span>Identitas belum diisi</span>
                  <button
                    className="change-btn"
                    style={{ color: '#0284C7', fontWeight: 900 }}
                    onClick={() => setScreen('identity')}
                  >
                    Isi Nama Sekarang
                  </button>
                </div>
              )}

              <button
                className="btn btn-primary btn-slider-next"
                onClick={() => setStep(1)}
              >
                PILIH CHECKPOINT ➜
              </button>
            </div>
          </div>

          {/* SLIDE 2: Peta Checkpoint Misi & Akses Guru */}
          <div className="home-slide home-slide-2">
            <div className="home-slide-inner">
              <div className="slide2-top">
                <button
                  className="btn-back-clean"
                  onClick={() => setStep(0)}
                  aria-label="Kembali ke Layar Aturan"
                >
                  ⬅️ Kembali
                </button>
                <div className="slide-dots" aria-label="Langkah 2 dari 2">
                  <span className="slide-dot" />
                  <span className="slide-dot active" />
                </div>
              </div>

              <div className="ch-header">
                <h2 className="ch-title">PETA MISI DETEKTIF</h2>
                <p className="ch-sub">
                  Selesaikan Posttest terlebih dahulu sebelum mengisi Angket Respon
                </p>
              </div>

              <div className="path-wrapper">
                <CheckpointPath />
              </div>

              <div className="slide2-actions">
                <button
                  className="guru-link"
                  onClick={onOpenTeacherPin}
                  title="Akses Panel Guru"
                >
                  🔑 Panel Guru / Rekap Nilai
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
