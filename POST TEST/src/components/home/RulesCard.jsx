import React from 'react';
import Icon from '../common/Icons';

export default function RulesCard() {
  return (
    <div className="rules">
      <div className="rule">
        <Icon name="target" size={19} style={{ color: 'var(--blue)' }} />
        <span>
          Kerjakan <b>20 butir soal evaluasi</b> dengan fokus dan teliti tanpa terburu-buru.
        </span>
      </div>
      <div className="rule">
        <Icon name="star" size={19} style={{ color: 'var(--gold-dark)' }} />
        <span>
          Jawaban benar bernilai <b>+10 XP</b> dan menaikkan combo api semangatmu.
        </span>
      </div>
      <div className="rule">
        <Icon name="trophy" size={19} style={{ color: 'var(--green-dark)' }} />
        <span>
          Setelah kuis selesai, kamu dapat <b>meninjau pembahasan lengkap</b> di akhir tes.
        </span>
      </div>
    </div>
  );
}
