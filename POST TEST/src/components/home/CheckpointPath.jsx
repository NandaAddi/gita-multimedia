import React, { useState } from 'react';
import Icon from '../common/Icons';
import Modal from '../common/Modal';
import { useStudent } from '../../context/StudentContext';
import { useQuiz } from '../../context/QuizContext';
import { ANGKET_URL } from '../../config/constants';

export default function CheckpointPath() {
  const { store, updateStore } = useStudent();
  const { startQuiz } = useQuiz();

  const [isLockedModalOpen, setIsLockedModalOpen] = useState(false);
  const [isPostDoneModalOpen, setIsPostDoneModalOpen] = useState(false);

  const hasPost = store.post !== null;
  const isAngketDone = store.angket;

  const handlePosttestClick = () => {
    if (hasPost) {
      setIsPostDoneModalOpen(true);
      return;
    }
    startQuiz();
  };

  const handleAngketClick = () => {
    if (!hasPost) {
      setIsLockedModalOpen(true);
    } else {
      window.open(ANGKET_URL, '_blank');
      updateStore({ angket: true });
    }
  };

  return (
    <>
      <div className="path">
        {/* Checkpoint 1: Posttest */}
        <div className="path-row">
          <div className="path-text">
            <div className="path-title">POSTTEST</div>
            <div className="path-sub">20 soal · evaluasi pemahaman ekosistem</div>
            {hasPost ? (
              <span className="done-badge" style={{ background: '#DCFCE7', color: '#15803D' }}>
                Skor: {store.post}/20 · Sudah Selesai ✅
              </span>
            ) : (
              <span className="done-badge" style={{ background: '#DCFCE7', color: '#166534' }}>
                Siap dikerjakan ✨
              </span>
            )}
          </div>
          <button
            className={`node ${hasPost ? 'gold' : 'green'}`}
            onClick={handlePosttestClick}
            aria-label={hasPost ? 'Posttest Selesai' : 'Mulai Posttest'}
          >
            <Icon name={hasPost ? 'check' : 'trophy'} size={40} />
          </button>
        </div>

        {/* Konektor SVG berliku */}
        <svg className="connector" viewBox="0 0 100 60" preserveAspectRatio="none">
          <path
            d="M78 2 C78 34 22 26 22 58"
            fill="none"
            stroke="#D8D8D8"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeDasharray="0.5 11"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Checkpoint 2: Angket Respon */}
        <div className="path-row">
          <button
            className={`node ${!hasPost ? 'lock' : isAngketDone ? 'gold' : 'green'}`}
            onClick={handleAngketClick}
            aria-label="Buka Angket Respon"
          >
            <Icon
              name={!hasPost ? 'lock' : isAngketDone ? 'check' : 'form'}
              size={!hasPost ? 38 : 40}
            />
          </button>
          <div className="path-text">
            <div className="path-title">ANGKET RESPON</div>
            <div className="path-sub">Beri tanggapanmu tentang petualangan ini</div>
            {!hasPost ? (
              <span className="done-badge" style={{ background: 'var(--snow)', color: 'var(--mut)' }}>
                Selesaikan posttest dulu
              </span>
            ) : isAngketDone ? (
              <span className="done-badge" style={{ background: '#FEF9C3', color: '#854D0E' }}>
                Sudah Mengisi ✨
              </span>
            ) : (
              <span className="done-badge" style={{ background: '#E0F2FE', color: '#0369A1' }}>
                Siap diisi 📝
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Modal Peringatan Checkpoint Terkunci */}
      <Modal
        isOpen={isLockedModalOpen}
        onClose={() => setIsLockedModalOpen(false)}
        icon="lock"
        tint="gold"
        title="Selesaikan Posttest dulu ya"
        text="Angket respon dapat diisi setelah kamu menyelesaikan evaluasi Posttest. Buktikan kemampuanmu di Posttest terlebih dahulu!"
        actions={[
          {
            label: 'KERJAKAN POSTTEST',
            kind: 'primary',
            onClick: () => {
              setIsLockedModalOpen(false);
              startQuiz();
            }
          },
          {
            label: 'NANTI SAJA',
            kind: 'ghost',
            onClick: () => setIsLockedModalOpen(false)
          }
        ]}
      />

      {/* Modal Peringatan Posttest Sudah Selesai (Tidak Bisa Diulang) */}
      <Modal
        isOpen={isPostDoneModalOpen}
        onClose={() => setIsPostDoneModalOpen(false)}
        icon="check"
        tint="green"
        title="Posttest Sudah Diselesaikan!"
        text={`Kamu sudah menyelesaikan evaluasi Posttest dengan perolehan skor ${store.post}/20. Evaluasi ini hanya dapat dikerjakan 1 kali. Silakan lanjutkan ke pengisian Angket Respon Siswa!`}
        actions={[
          {
            label: 'ISI ANGKET RESPON 📝',
            kind: 'primary',
            onClick: () => {
              setIsPostDoneModalOpen(false);
              handleAngketClick();
            }
          },
          {
            label: 'TUTUP',
            kind: 'ghost',
            onClick: () => setIsPostDoneModalOpen(false)
          }
        ]}
      />
    </>
  );
}
